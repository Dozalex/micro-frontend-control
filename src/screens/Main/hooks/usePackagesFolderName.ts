import * as React from 'react';

const KEY = 'mfc-packagesFolderName';

const getValue = () => localStorage.getItem(KEY) || '';

const saveValue = (data: string) => {
  localStorage.setItem(KEY, data);
};

export const usePackagesFolderName = () => {
  const [packagesFolderName, setPackagesFolderName] = React.useState(
    getValue() || 'packages',
  );

  // update ls value
  React.useEffect(() => {
    saveValue(packagesFolderName);
  }, [packagesFolderName]);

  return { packagesFolderName, setPackagesFolderName };
};
