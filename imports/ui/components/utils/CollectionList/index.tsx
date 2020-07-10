import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import {
  Grid,
  createStyles,
  Theme,
  makeStyles,
  GridDirection,
} from '@material-ui/core';

import { EmployeeType } from '../../../../api/users/schema';
import AddCard from '../AddCard';
import {
  PublicationSelector,
  publicationsEnum,
  OfferCardProps,
  EmployeeCardProps,
  CompanyCardProps,
  CertificateCardProps,
} from '../../../../startup/both/globalTypes';
import { CompanyType } from '../../../../api/companies/schema';
import NoElements from './NoElements';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemsContainerHorizontal: {
      maxWidth: 1030,
      marginLeft: '50%',
      transform: 'translateX(-50%)',
    },
    itemsContainerVertical: {
      marginLeft: '50%',
      transform: 'translateX(-50%)',
    },
    paginationContainer: {
      marginTop: theme.spacing(3),
    },
  })
);

type Props = {
  type: 'employees' | 'offers' | 'companies' | 'certificates';
  withAdd?: boolean;
  subscriptionArgs: PublicationSelector<
    EmployeeType  | CompanyType
  >;
  collection: Mongo.Collection<
    EmployeeType | CompanyType
  >;
  Component: React.ComponentType<
    EmployeeCardProps | OfferCardProps | CompanyCardProps | CertificateCardProps
  >;
  componentExtraProps?: object;
  listDirection?: GridDirection;
};

type CountsType = {
  _id: string;
  count: number;
};

const Counts = new Mongo.Collection<CountsType>('counts');

const CollectionList = ({
  type,
  Component,
  collection,
  withAdd = true,
  subscriptionArgs,
  componentExtraProps,
  listDirection = 'row',
}: Props) => {
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);

  const PAGE_SIZE = withAdd ? 7 : 8;

  subscriptionArgs = {
    limit: PAGE_SIZE,
    skip: PAGE_SIZE * page,
    sort: { createdAt: -1 },
    ...subscriptionArgs,
  };

  const subsReady = useTracker(() => {
    const publicationName: string = publicationsEnum[`${type}`];
    Meteor.subscribe(publicationName, subscriptionArgs);
    const countHandle = Meteor.subscribe('collection.counts', type, {
      selector: subscriptionArgs.selector,
    });
    return countHandle.ready();
  }, [subscriptionArgs, type, page]);

  const items = useTracker(() => {
    const cursor = collection
      .find(subscriptionArgs.selector, {
        limit: PAGE_SIZE,
        skip: PAGE_SIZE * page,
        sort: { createdAt: -1 },
      })
      .fetch();
    const count = Counts.find().fetch();
    return { cursor, count: (count && count[0] && count[0].count) || 0 };
  }, [page, subsReady]);

  const getTotalPages = () => Math.ceil(items.count / PAGE_SIZE);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value - 1);
  };

  const renderPaginator = () => {
    const pages = getTotalPages();
    return (
      <Pagination
        count={pages}
        showFirstButton={page !== 0}
        showLastButton={page !== pages}
        onChange={handlePageChange}
        color="primary"
      />
    );
  };

  const getCollectionComponentProps = (
    element: EmployeeType | CompanyType
  ):
    | OfferCardProps
    | EmployeeCardProps
    | CompanyCardProps
    | CertificateCardProps => {
    switch (type) {
      case 'employees':
        return { employee: element as EmployeeType, ...componentExtraProps };
      case 'companies':
        return { company: element as CompanyType, ...componentExtraProps };
      default:
        break;
    }
  };

  if (!items.count && !withAdd) {
    return <NoElements />;
  }

  return (
    <>
      <Grid
        container
        spacing={4}
        direction={listDirection}
        className={
          listDirection
            ? classes.itemsContainerHorizontal
            : classes.itemsContainerVertical
        }
      >
        {withAdd && <AddCard type={type} />}
        {items.cursor.map((i) => {
          return (
            <Grid item key={i._id}>
              <Component {...getCollectionComponentProps(i)} />
            </Grid>
          );
        })}
      </Grid>
      <Grid
        container
        spacing={2}
        justify="center"
        alignItems="baseline"
        className={classes.paginationContainer}
      >
        {renderPaginator()}
      </Grid>
    </>
  );
};

export default CollectionList;
