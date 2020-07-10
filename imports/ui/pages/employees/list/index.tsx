import React from 'react';
import AppLayout from '../../../components/AppLayout';
import EmployeesFilterableList from '../../../components/employees/EmployeesFilterableList';

const EmployeesListPage = () => {
  return (
    <AppLayout>
      <EmployeesFilterableList />
    </AppLayout>
  );
};

export default EmployeesListPage;
