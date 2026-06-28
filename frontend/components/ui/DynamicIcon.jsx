import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';

// 1. Add this helper function to convert kebab-case to PascalCase
const toPascalCase = (string) => {
  return string
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
};

const DynamicIcon = ({ iconName, size = 24, className = "" }) => {
  if (!iconName) return null;
  const formattedName = toPascalCase(iconName);

  const prefix = formattedName.substring(0, 2);
  let IconComponent = null;

  if (prefix === 'Fa') {
    IconComponent = FaIcons[formattedName];
  } else if (prefix === 'Fi') {
    IconComponent = FiIcons[formattedName];
  }

  if (!IconComponent) {
    console.warn(`Could not find icon: ${formattedName}`);
    return null;
  }

  return <IconComponent size={size} className={className} />;
};

export default DynamicIcon;