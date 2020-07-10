import React from 'react';
import AppLayout from '../../../components/AppLayout';
import { Card, CardContent } from '@material-ui/core';
import ManageEmployeesForm from '../../../components/employees/ManageEmployeesForm';

const EmployeesAddPage = () => {
  return (
    <AppLayout>
      <Card>
        <CardContent>
          <ManageEmployeesForm />
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default EmployeesAddPage;
