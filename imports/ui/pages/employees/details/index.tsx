import React, { useState } from 'react';
import AppLayout from '../../../components/AppLayout';
import {
  Card,
  CardContent,
  CircularProgress,
  Tabs,
  Tab,
} from '@material-ui/core';
import ManageEmployeesForm from '../../../components/employees/ManageEmployeesForm';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { Employees } from '../../../../api/users/users';
import { TabType } from '../../../../startup/both/globalTypes';
import TabPanel from '../../../components/utils/TabPanel';

type Params = {
  _id: string;
};

type State = {
  activeTab: number;
};

const tabs: TabType[] = [{ label: 'Employee', value: 0 }];

const EmployeesDetailsPage = () => {
  const { _id } = useParams<Params>();
  const [state, setState] = useState<State>({ activeTab: tabs[0].value });

  const subsReady = useTracker(() => {
    const handle = Meteor.subscribe('employees.selector.options', {
      selector: { _id },
    });
    return handle.ready();
  }, [_id]);

  const employee = useTracker(() => Employees.findOne({ _id }), [
    subsReady,
    _id,
  ]);

  if (!subsReady) {
    return (
      <AppLayout>
        <Card>
          <CardContent>
            <div style={{ textAlign: 'center' }}>
              <CircularProgress />
            </div>
          </CardContent>
        </Card>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Card>
        <CardContent>
          {employee ? (
            <>
              <Tabs
                value={state.activeTab}
                scrollButtons="on"
                textColor="primary"
                variant="scrollable"
                indicatorColor="primary"
                aria-label="offers tabs"
                onChange={(event: React.ChangeEvent<{}>, newValue: number) =>
                  setState({ ...state, activeTab: newValue })
                }
              >
                {tabs.map((tab) => (
                  <Tab key={tab.label} label={tab.label} value={tab.value} />
                ))}
              </Tabs>
              <TabPanel value={state.activeTab} index={0}>
                <ManageEmployeesForm model={employee} />
              </TabPanel>
            </>
          ) : (
            <div>No Employee found</div>
          )}
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default EmployeesDetailsPage;
