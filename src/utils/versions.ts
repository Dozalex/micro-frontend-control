export const replaceVersionInPackageJson = ({
  packageJsonText,
  packageName,
  newVersion,
}: {
  packageJsonText: string;
  packageName: string;
  newVersion: string;
}) => {
  // Construct a regular expression to match the version number
  const regex = new RegExp(`("${packageName}":\\s*")[^"]*(")`, 'g');

  // Replace the matched version number with newVersion
  return packageJsonText.replace(regex, `$1${newVersion}$2`);
};
