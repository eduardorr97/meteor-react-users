import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap, GridDirection } from '@material-ui/core';
import { EmployeeType } from '../../api/users/schema';

export enum publicationsEnum {
  employees = 'employees.selector.options',
}

export type CredentialsType = {
  user: string;
  password: string;
};

export interface RoleNameType {
  ADMIN: 'admin';
  ADMIN_OPERATOR: 'admin operator';
  DISTRIBUTOR: 'distributor';
  PROMOTER: 'promoter';
  AGENT: 'agent';
}

export interface RoleType extends RoleNameType {
  GLOBAL_GROUP: 'global_group';
  isRoot(userId?: string): boolean;
  isAdmin(userId?: string): boolean;
  isAdminOperator(userId?: string): boolean;
  isDistributor(userId?: string): boolean;
  isPromoter(userId?: string): boolean;
  isAgent(userId?: string): boolean;
}

export type RouteType = {
  title: string;
  href: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
};

export interface RoleAsignment {
  _id: string;
  role: {
    _id: string;
    scope: string;
  };
  user: {
    _id: string;
  };
  inheritedRoles: {
    _id: string;
  }[];
}

export interface ContextType {
  currentUser?: Meteor.User;
  currentUserRole?: RoleAsignment;
  currentEmployee?: EmployeeType;
}

type FieldSpecifier = {
  string?: 0 | 1;
};

type SortSpecifier<T> = {
  [field in keyof T]?: 1 | -1;
};

export type PublicationSelector<T> = {
  selector?: Mongo.Selector<T>;
  fields?: FieldSpecifier;
  sort?: Mongo.SortSpecifier;
  limit?: number;
  skip?: number;
};

export type PaginationSelector<T> = {
  selector?: Mongo.Selector<T>;
  fields?: Mongo.FieldSpecifier;
  sort?: Mongo.SortSpecifier;
  pageSize?: number;
  page?: number;
};

export type TabType = {
  label: string;
  value: number;
};

export type EmployeeCardProps = {
  employee: EmployeeType;
};