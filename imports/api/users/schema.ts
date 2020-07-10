import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { roleNames } from '../../startup/both/roles';
import { DATA } from '../../startup/both/utils';

export const employeeSchema = new SimpleSchema({
  _id: {
    type: String,
    optional: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  userId: {
    type: String,
    optional: true,
  },
  role: {
    type: String,
    allowedValues() {
      const { ADMIN, ADMIN_OPERATOR, DISTRIBUTOR, PROMOTER, AGENT } = roleNames;
      return Object.values([
        ADMIN,
        ADMIN_OPERATOR,
        DISTRIBUTOR,
        PROMOTER,
        AGENT,
      ]).map((name) => name);
    },
  },
  workPhone: {
    type: String,
    regEx: SimpleSchema.RegEx.Phone,
  },
  mobilePhone: {
    type: String,
    regEx: SimpleSchema.RegEx.Phone,
    optional: true,
  },
  homePhone: {
    type: String,
    regEx: SimpleSchema.RegEx.Phone,
    optional: true,
  },
  address: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  country: {
    type: String,
    allowedValues: DATA.countries,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  active: {
    type: Boolean,
    defaultValue: true,
  },
  createdAt: {
    type: Date,
    optional: true,
    defaultValue: new Date(),
  },
  lastUpdatedAt: {
    type: Date,
    optional: true,
  },
  createdBy: {
    type: String,
    optional: true,
  },
  lastUpdatedBy: {
    type: String,
    optional: true,
  },
});

export const employeeSchemaBridge = new SimpleSchema2Bridge(employeeSchema);
export interface EmployeeType {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  userId?: string;
  role: string;
  workPhone: string;
  mobilePhone?: string;
  homePhone?: string;
  address: string;
  zipCode: string;
  country: string;
  state: string;
  city: string;
  active: boolean;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  createdBy?: string;
  lastUpdatedBy?: string;
}

export type EmployeesSelectorPagination = {
  selector?: Mongo.Selector<EmployeeType>;
  fields?: Mongo.FieldSpecifier;
  sort?: Mongo.SortSpecifier;
  pageSize?: number;
  page?: number;
};
