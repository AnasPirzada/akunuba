'use client';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function EntityStructurePage() {
  const { isDarkMode } = useTheme();
  const [selectedEntity, setSelectedEntity] = useState('Golden Trust LLC');
  const [activeTab, setActiveTab] = useState('people'); // 'people' or 'audit'
  const [manageMenuOpen, setManageMenuOpen] = useState(null);

  // Close manage menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside any manage menu
      const clickedElement = event.target;
      const isManageButton = clickedElement.closest('[data-manage-button]');
      const isManageMenu = clickedElement.closest('[data-manage-menu]');
      
      if (!isManageButton && !isManageMenu) {
        setManageMenuOpen(null);
      }
    };

    if (manageMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [manageMenuOpen]);

  // Mock data
  const entityData = {
    name: 'Golden Trust LLC',
    location: 'United States',
    registrationNumber: 'DE-123456789',
    formationDate: 'Jan 15, 2020',
    status: 'Active',
  };

  const entityTypes = [
    {
      type: 'LLC (Limited Liability Company)',
      jurisdiction: 'State',
      formationRates: 'LLC',
      status: 'Active',
      statusColor: 'text-red-400',
    },
    {
      type: 'Corporation (C-Corp)',
      jurisdiction: 'Federal',
      formationRates: 'Corporation',
      status: 'Pending',
      statusColor: 'text-[#F1CB68]',
    },
    {
      type: 'S-Corporation (S-Corp)',
      jurisdiction: 'Tribal',
      formationRates: 'Sole Proprietorship',
      status: 'Inactive',
      statusColor: 'text-gray-400',
    },
    {
      type: 'Partnership (GP/LP/LLP)',
      jurisdiction: 'International',
      formationRates: 'Nonprofit Corporation',
      status: 'Good Standing',
      statusColor: 'text-green-400',
    },
  ];

  const complianceStatus = [
    { label: 'KYC/AML Status', value: 'Pending', color: 'text-[#F1CB68]' },
    { label: 'Registered Agent', value: 'Verified', color: 'text-red-400' },
    { label: 'Tax Residency', value: 'United States', color: 'text-gray-400' },
    {
      label: 'FATCA/CRS Compliance',
      value: 'Not Compliant',
      color: 'text-gray-400',
    },
  ];

  const people = [
    { name: 'Jasmine', role: 'Trustee' },
    { name: 'Stephen', role: 'Signatory' },
    { name: 'Nina', role: 'Power of Attorney' },
  ];

  const auditTrailEntries = [
    {
      id: 1,
      timestamp: '2024-01-15 10:30 AM',
      user: 'Stephen',
      role: 'User',
      action: 'Document Uploaded',
      document: 'Articles of Incorporation',
      status: 'Approved',
      statusColor: 'text-green-400',
      notes: 'Initial entity formation documents submitted for review.',
    },
    {
      id: 2,
      timestamp: '2024-01-14 2:15 PM',
      user: 'Compliance Officer',
      role: 'Compliance Officer',
      action: 'Status Updated',
      document: 'KYC/AML Review',
      status: 'Pending',
      statusColor: 'text-[#F1CB68]',
      notes: 'KYC documentation requires additional verification. Awaiting response from registered agent.',
    },
    {
      id: 3,
      timestamp: '2024-01-13 9:45 AM',
      user: 'Jasmine',
      role: 'Trustee',
      action: 'Person Added',
      document: 'Trustee Assignment',
      status: 'Verified',
      statusColor: 'text-green-400',
      notes: 'Jasmine assigned as trustee with full administrative powers.',
    },
    {
      id: 4,
      timestamp: '2024-01-12 4:20 PM',
      user: 'Compliance Officer',
      role: 'Compliance Officer',
      action: 'Document Approved',
      document: 'Trust Deed',
      status: 'Approved',
      statusColor: 'text-green-400',
      notes: 'Trust deed reviewed and approved. All legal requirements met.',
    },
    {
      id: 5,
      timestamp: '2024-01-11 11:00 AM',
      user: 'Stephen',
      role: 'User',
      action: 'Entity Created',
      document: 'Golden Trust LLC',
      status: 'Active',
      statusColor: 'text-green-400',
      notes: 'Entity structure created and registered in Delaware.',
    },
  ];

  const handleDownloadCompliancePackage = () => {
    // Handle download logic
    console.log('Downloading compliance package...');
  };

  const handleAddEntity = () => {
    // Handle add entity logic
    console.log('Adding new entity...');
  };

  return (
    <DashboardLayout>
      <div className='space-y-6'>
        {/* Header Section */}
        <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6'>
          <div>
            <h1
              className={`text-3xl md:text-4xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
          Entity Structure
        </h1>
            <h2
              className={`text-xl md:text-2xl font-semibold mb-1 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              {entityData.name}
            </h2>
            <p className='text-[#F1CB68] text-sm md:text-base'>
              {entityData.location}
            </p>
          </div>
          <button
            onClick={handleDownloadCompliancePackage}
            className={`px-4 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base font-medium transition-all hover:opacity-90 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap border border-[#F1CB68] bg-transparent hover:bg-[#F1CB68]/10 ${
              isDarkMode ? 'text-[#F1CB68]' : 'text-gray-900'
            }`}
          >
            <Image
              src='/icons/download.svg'
              alt='Download'
              width={18}
              height={18}
              className='w-4 h-4 md:w-5 md:h-5'
            />
            Compliance Package
          </button>
        </div>

        {/* Entity Type Overview Card */}
        <div
          className={`rounded-2xl p-4 md:p-6 border overflow-hidden ${
            isDarkMode
              ? 'bg-[#1A1A1D] border-[#FFFFFF14]'
              : 'bg-white border-gray-200'
          }`}
        >
          <h3
            className={`text-lg md:text-xl font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Entity Type Overview
          </h3>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr
                  className={`border-b ${
                    isDarkMode ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <th
                    className={`text-left px-4 md:px-6 py-3 text-xs md:text-sm font-semibold uppercase ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Type
                  </th>
                  <th
                    className={`text-left px-4 md:px-6 py-3 text-xs md:text-sm font-semibold uppercase ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Jurisdiction
                  </th>
                  <th
                    className={`text-left px-4 md:px-6 py-3 text-xs md:text-sm font-semibold uppercase ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Formation Rates
                  </th>
                  <th
                    className={`text-left px-4 md:px-6 py-3 text-xs md:text-sm font-semibold uppercase ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Status
                  </th>
                  <th
                    className={`text-left px-4 md:px-6 py-3 text-xs md:text-sm font-semibold uppercase ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {entityTypes.map((entity, index) => (
                  <tr
                    key={index}
                    className={`border-b transition-colors ${
                      isDarkMode
                        ? 'border-white/5 hover:bg-white/5'
                        : 'border-gray-200 hover:bg-gray-50'
                    } ${index === entityTypes.length - 1 ? 'border-0' : ''}`}
                  >
                    <td
                      className={`px-4 md:px-6 py-4 text-sm md:text-base ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {entity.type}
                    </td>
                    <td
                      className={`px-4 md:px-6 py-4 text-sm md:text-base ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {entity.jurisdiction}
                    </td>
                    <td
                      className={`px-4 md:px-6 py-4 text-sm md:text-base ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {entity.formationRates}
                    </td>
                    <td className='px-4 md:px-6 py-4'>
                      <span className={`text-sm md:text-base font-medium ${entity.statusColor}`}>
                        {entity.status}
                      </span>
                    </td>
                    <td className='px-4 md:px-6 py-4'>
                      <button
                        className={`text-sm md:text-base font-medium transition-colors ${
                          isDarkMode
                            ? 'text-[#F1CB68] hover:text-[#E5C158]'
                            : 'text-gray-900 hover:text-[#F1CB68]'
                        }`}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Entity Structure Diagram Card */}
          <div
            className={`rounded-2xl p-4 md:p-6 border ${
              isDarkMode
                ? 'bg-[#1A1A1D] border-[#FFFFFF14]'
                : 'bg-white border-gray-200'
            }`}
          >
            <h3
              className={`text-lg md:text-xl font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Entity Structure
            </h3>
            <div className='space-y-4'>
              {/* Parent Entity */}
              <div
                className={`rounded-lg border-2 border-[#F1CB68] p-4 ${
                  isDarkMode ? 'bg-white/5' : 'bg-[#F1CB68]/10'
                }`}
              >
                <p
                  className={`text-center font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Golden Trust
                </p>
              </div>

              {/* Connection Line */}
              <div className='flex justify-center'>
                <div className='w-0.5 h-8 border-l-2 border-dashed border-[#F1CB68]'></div>
              </div>

              {/* Child Entity */}
              <div
                className={`rounded-lg border-2 border-[#F1CB68] p-4 cursor-pointer hover:opacity-80 transition-opacity ${
                  isDarkMode ? 'bg-white/5' : 'bg-[#F1CB68]/10'
                }`}
                onClick={handleAddEntity}
              >
                <p
                  className={`text-center font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  + Add Entity
                </p>
              </div>
            </div>
          </div>

          {/* Compliance Status & Documentation Card */}
          <div
            className={`rounded-2xl p-4 md:p-6 border ${
              isDarkMode
                ? 'bg-[#1A1A1D] border-[#FFFFFF14]'
                : 'bg-white border-gray-200'
            }`}
          >
            <h3
              className={`text-lg md:text-xl font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Compliance Status & Documentation
            </h3>
            <div className='space-y-4'>
              {complianceStatus.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between py-3 border-b ${
                    isDarkMode ? 'border-white/10' : 'border-gray-200'
                  } ${index === complianceStatus.length - 1 ? 'border-0' : ''}`}
                >
                  <span
                    className={`text-sm md:text-base ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className={`text-sm md:text-base font-medium ${item.color}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Document Upload Section */}
            <div className='mt-6 pt-6 border-t border-white/10'>
              <h4
                className={`text-sm md:text-base font-semibold mb-3 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Supporting Documents
              </h4>
              <div className='space-y-2'>
                <button
                  className={`w-full px-4 py-2 rounded-lg border border-dashed transition-colors ${
                    isDarkMode
                      ? 'border-white/20 hover:border-[#F1CB68] text-gray-400 hover:text-white'
                      : 'border-gray-300 hover:border-[#F1CB68] text-gray-600 hover:text-gray-900'
                  }`}
                >
                  + Upload Document
                </button>
                <p
                  className={`text-xs md:text-sm text-center ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}
                >
                  Articles of Incorporation, Trust Deeds, Operating Agreements, etc.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* People & Roles / Audit Trail & Notes - Tabbed Section */}
        <div
          className={`rounded-2xl p-4 md:p-6 border ${
            isDarkMode
              ? 'bg-[#1A1A1D] border-[#FFFFFF14]'
              : 'bg-white border-gray-200'
          }`}
        >
          {/* Tabs */}
          <div className='flex gap-2 md:gap-4 mb-6 border-b border-white/10'>
            <button
              onClick={() => setActiveTab('people')}
              className={`px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base font-medium transition-all relative ${
                activeTab === 'people'
                  ? isDarkMode
                    ? 'text-white'
                    : 'text-gray-900'
                  : isDarkMode
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              People & Roles
              {activeTab === 'people' && (
                <div
                  className='absolute bottom-0 left-0 right-0 h-0.5'
                  style={{
                    background: isDarkMode
                      ? 'linear-gradient(90deg, #F1CB68 0%, #F1CB68 100%)'
                      : '#F1CB68',
                  }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base font-medium transition-all relative ${
                activeTab === 'audit'
                  ? isDarkMode
                    ? 'text-white'
                    : 'text-gray-900'
                  : isDarkMode
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Audit Trail & Notes
              {activeTab === 'audit' && (
                <div
                  className='absolute bottom-0 left-0 right-0 h-0.5'
                  style={{
                    background: isDarkMode
                      ? 'linear-gradient(90deg, #F1CB68 0%, #F1CB68 100%)'
                      : '#F1CB68',
                  }}
                />
              )}
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'people' ? (
            <div className='space-y-4'>
              {people.map((person, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between py-3 border-b ${
                    isDarkMode ? 'border-white/10' : 'border-gray-200'
                  } ${index === people.length - 1 ? 'border-0' : ''}`}
                >
                  <div>
                    <p
                      className={`text-sm md:text-base font-medium mb-1 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {person.name}
                    </p>
                    <p
                      className={`text-xs md:text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {person.role}
                    </p>
                  </div>
                  <button
                    className={`text-xs md:text-sm font-medium transition-colors ${
                      isDarkMode
                        ? 'text-[#F1CB68] hover:text-[#E5C158]'
                        : 'text-[#F1CB68] hover:text-[#E5C158]'
                    }`}
                  >
                    Manage
                  </button>
                </div>
              ))}
              <button
                className={`w-full mt-4 px-4 py-2 rounded-lg border border-dashed transition-colors ${
                  isDarkMode
                    ? 'border-white/20 hover:border-[#F1CB68] text-gray-400 hover:text-white'
                    : 'border-gray-300 hover:border-[#F1CB68] text-gray-600 hover:text-gray-900'
                }`}
              >
                + Add Person
              </button>
            </div>
          ) : (
            <div className='space-y-4'>
              {/* Audit Trail Entries */}
              <div className='space-y-4 max-h-[600px] overflow-y-auto'>
                {auditTrailEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className={`rounded-lg p-4 border ${
                      isDarkMode
                        ? 'bg-white/5 border-white/10'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className='flex items-start justify-between mb-2'>
                      <div className='flex-1'>
                        <div className='flex items-center gap-2 mb-1'>
                          <span
                            className={`text-sm md:text-base font-semibold ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {entry.user}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              entry.role === 'Compliance Officer'
                                ? 'bg-blue-500/20 text-blue-400'
                                : 'bg-[#F1CB68]/20 text-[#F1CB68]'
                            }`}
                          >
                            {entry.role}
                          </span>
                        </div>
                        <p
                          className={`text-xs md:text-sm mb-2 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          {entry.timestamp}
                        </p>
                        <div className='flex items-center gap-2 mb-2'>
                          <span
                            className={`text-sm md:text-base font-medium ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {entry.action}:
                          </span>
                          <span
                            className={`text-sm md:text-base ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            {entry.document}
                          </span>
                          <span
                            className={`text-xs md:text-sm font-medium ${entry.statusColor}`}
                          >
                            ({entry.status})
                          </span>
                        </div>
                        <p
                          className={`text-xs md:text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          {entry.notes}
                        </p>
                      </div>
                      <div className='relative ml-4'>
                        <button
                          data-manage-button
                          onClick={() =>
                            setManageMenuOpen(
                              manageMenuOpen === entry.id ? null : entry.id
                            )
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                            isDarkMode
                              ? 'text-[#F1CB68] hover:bg-white/5 border border-white/10'
                              : 'text-[#F1CB68] hover:bg-gray-100 border border-gray-300'
                          }`}
                        >
                          Manage
                        </button>
                        {manageMenuOpen === entry.id && (
                          <div
                            data-manage-menu
                            className={`absolute right-0 mt-2 w-48 rounded-lg border shadow-lg z-10 ${
                              isDarkMode
                                ? 'bg-[#1A1A1D] border-white/10'
                                : 'bg-white border-gray-200'
                            }`}
                          >
                            <button
                              onClick={() => setManageMenuOpen(null)}
                              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                                isDarkMode
                                  ? 'text-white hover:bg-white/5'
                                  : 'text-gray-900 hover:bg-gray-50'
                              }`}
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => setManageMenuOpen(null)}
                              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                                isDarkMode
                                  ? 'text-white hover:bg-white/5'
                                  : 'text-gray-900 hover:bg-gray-50'
                              }`}
                            >
                              Edit Note
                            </button>
                            <button
                              onClick={() => setManageMenuOpen(null)}
                              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                                isDarkMode
                                  ? 'text-white hover:bg-white/5'
                                  : 'text-gray-900 hover:bg-gray-50'
                              }`}
                            >
                              Download Document
                            </button>
                            <button
                              onClick={() => setManageMenuOpen(null)}
                              className={`w-full text-left px-4 py-2 text-sm transition-colors border-t ${
                                isDarkMode
                                  ? 'text-red-400 hover:bg-white/5 border-white/10'
                                  : 'text-red-600 hover:bg-gray-50 border-gray-200'
                              }`}
                            >
                              Delete Entry
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Note Section */}
              <div
                className={`mt-6 pt-6 border-t ${
                  isDarkMode ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <h4
                  className={`text-sm md:text-base font-semibold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Add Note
                </h4>
                <textarea
                  placeholder='Add a note or comment...'
                  rows={3}
                  className={`w-full px-4 py-3 rounded-lg border resize-none focus:outline-none focus:ring-2 focus:ring-[#F1CB68] ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                />
                <div className='flex items-center gap-3 mt-3'>
                  <button
                    className='px-4 py-2 bg-[#F1CB68] text-[#101014] rounded-lg font-medium hover:bg-[#E5C158] transition-colors'
                  >
                    Add Note
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg font-medium border transition-colors ${
                      isDarkMode
                        ? 'border-white/10 text-white hover:bg-white/5'
                        : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {/* File Upload Section */}
              <div
                className={`mt-6 pt-6 border-t ${
                  isDarkMode ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <h4
                  className={`text-sm md:text-base font-semibold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Upload Document
                </h4>
                <div
                  className={`rounded-lg border border-dashed p-6 flex flex-col items-center justify-center ${
                    isDarkMode
                      ? 'border-white/20 bg-white/5'
                      : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  <p
                    className={`text-sm md:text-base mb-2 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Drag & drop files here or
                  </p>
                  <button
                    className='px-4 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base font-medium transition-all hover:opacity-90 cursor-pointer'
                    style={{
                      background:
                        'linear-gradient(90deg, #FFFFFF 0%, #F1CB68 100%)',
                      color: '#000000',
                    }}
                  >
                    Browse Files
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
