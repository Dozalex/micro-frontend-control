import * as React from 'react';

export type TabsProps = {
  activeTabId: string;
  onChange: (tabId: string) => void;
  tabs: {
    id: string;
    title: string;
  }[];
};

export const Tabs = ({ activeTabId, tabs, onChange }: TabsProps) => (
  <div className='text-sm font-medium text-center border-b text-gray-400 border-gray-700'>
    <ul className='flex flex-wrap -mb-px'>
      {tabs.map(tab => (
        <li key={tab.id}>
          <button
            type='button'
            onClick={() => onChange(tab.id)}
            className={`inline-block p-4 border-b-2 cursor-pointer ${tab.id === activeTabId ? 'rounded-t-lg active text-blue-500 border-blue-500' : 'border-transparent rounded-t-lg hover:border-gray-300 hover:text-gray-300'}`}
          >
            {tab.title}
          </button>
        </li>
      ))}
    </ul>
  </div>
);
