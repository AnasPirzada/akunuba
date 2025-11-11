'use client';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useTheme } from '@/context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export default function CompliancePage() {
  const { isDarkMode } = useTheme();
  const [dateRange, setDateRange] = useState('5th Jan - 30th Jan');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const summaryCards = [
    {
      title: 'Compliance Score',
      value: '98.5%',
      change: '+1.2%',
      changeColor: 'text-green-400',
      progress: 98.5,
    },
    {
      title: 'Pending Audits',
      value: '3',
      change: '- Unchanged',
      changeColor: 'text-gray-400',
      progress: 60,
    },
    {
      title: 'Open Alerts',
      value: '5',
      change: '+-2 since last week',
      changeColor: 'text-gray-400',
      progress: 50,
    },
  ];

  const pendingTasks = [
    {
      id: 1,
      taskName: 'Review Q3 AML Policy Update',
      assignee: 'Jane Doe',
      dueDate: 'Nov 15, 2023',
      status: 'Overdue',
      statusColor: 'text-red-400',
    },
    {
      id: 2,
      taskName: 'Complete Annual GDPR Training',
      assignee: 'John Smith',
      dueDate: 'Nov 20, 2023',
      status: 'Pending',
      statusColor: 'text-[#F1CB68]',
    },
    {
      id: 3,
      taskName: 'Submit SOC 2 Evidence Request',
      assignee: 'Compliance Team',
      dueDate: 'Dec 05, 2025',
      status: 'Not Started',
      statusColor: 'text-gray-400',
    },
    {
      id: 4,
      taskName: 'Internal Audit for Transaction Monitoring',
      assignee: 'Alex Johnson',
      dueDate: 'Oct 20, 2023',
      status: 'Completed',
      statusColor: 'text-green-400',
    },
  ];

  const handleViewTask = (taskId) => {
    const task = pendingTasks.find((t) => t.id === taskId);
    if (task) {
      // Convert date format for modal display
      const dateMap = {
        1: 'November 15, 2023',
        2: 'November 20, 2023',
        3: 'December 05, 2025',
        4: 'October 20, 2023',
      };
      
      setSelectedTask({
        ...task,
        dueDate: dateMap[taskId] || task.dueDate,
        priority: taskId === 1 ? 'High' : taskId === 2 ? 'Medium' : taskId === 3 ? 'High' : 'Medium',
        description:
          taskId === 1
            ? 'Please review the attached draft of the Q3 2023 Anti-Money Laundering (AML) policy updates. Provide feedback and approval by the due date to ensure timely implementation and adherence to new regulatory guidelines.'
            : taskId === 2
            ? 'Complete the annual GDPR training module to ensure compliance with data protection regulations. The training covers key updates to GDPR requirements and best practices for data handling.'
            : taskId === 3
            ? 'Submit all required evidence documents for the SOC 2 Type II audit. This includes security controls documentation, access logs, and compliance certifications.'
            : 'Conduct internal audit of transaction monitoring systems to ensure all suspicious activities are properly flagged and reported according to regulatory requirements.',
      });
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleReassign = () => {
    // Handle reassign logic
    console.log('Reassigning task...');
  };

  const handleMarkAsCompleted = () => {
    // Handle mark as completed logic
    console.log('Marking task as completed...');
    handleCloseModal();
  };

  return (
    <DashboardLayout>
      <div className='space-y-6'>
        {/* Header Section */}
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6'>
          <h1
            className={`text-3xl md:text-4xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Compliance Center
        </h1>
          <div className='flex items-center gap-3'>
            <span
              className={`text-sm md:text-base ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Last Update
            </span>
            <button
              className={`px-4 py-2 rounded-lg border flex items-center gap-2 transition-colors ${
                isDarkMode
                  ? 'border-white/10 bg-white/5 hover:bg-white/10 text-white'
                  : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-900'
              }`}
            >
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                className={isDarkMode ? 'text-white' : 'text-gray-900'}
              >
                <rect x='3' y='4' width='18' height='18' rx='2' ry='2' />
                <line x1='16' y1='2' x2='16' y2='6' />
                <line x1='8' y1='2' x2='8' y2='6' />
                <line x1='3' y1='10' x2='21' y2='10' />
              </svg>
              <span className='text-sm md:text-base'>{dateRange}</span>
              <Image
                src='/icons/chevron-down.svg'
                alt='Dropdown'
                width={16}
                height={16}
                className={isDarkMode ? 'brightness-0 invert' : ''}
              />
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {summaryCards.map((card, index) => (
            <div
              key={index}
              className={`rounded-2xl p-4 md:p-6 border ${
                isDarkMode
                  ? 'bg-[#1A1A1D] border-[#FFFFFF14]'
                  : 'bg-white border-gray-200'
              }`}
            >
              <h3
                className={`text-sm md:text-base mb-4 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {card.title}
              </h3>
              <p
                className={`text-3xl md:text-4xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {card.value}
              </p>
              <p className={`text-xs md:text-sm mb-4 ${card.changeColor}`}>
                {card.change}
              </p>
              <div className='w-full h-1 bg-white/10 rounded-full overflow-hidden'>
                <div
                  className='h-full bg-[#F1CB68] transition-all'
                  style={{ width: `${card.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Pending Tasks Section */}
        <div
          className={`rounded-2xl p-4 md:p-6 border ${
            isDarkMode
              ? 'bg-[#1A1A1D] border-[#FFFFFF14]'
              : 'bg-white border-gray-200'
          }`}
        >
          <h2
            className={`text-xl md:text-2xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Pending Tasks
          </h2>
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
                    Task Name
                  </th>
                  <th
                    className={`text-left px-4 md:px-6 py-3 text-xs md:text-sm font-semibold uppercase ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Assignee
                  </th>
                  <th
                    className={`text-left px-4 md:px-6 py-3 text-xs md:text-sm font-semibold uppercase ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Due Date
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
                {pendingTasks.map((task, index) => (
                  <tr
                    key={task.id}
                    className={`border-b transition-colors ${
                      isDarkMode
                        ? 'border-white/5 hover:bg-white/5'
                        : 'border-gray-200 hover:bg-gray-50'
                    } ${index === pendingTasks.length - 1 ? 'border-0' : ''}`}
                  >
                    <td
                      className={`px-4 md:px-6 py-4 text-sm md:text-base ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {task.taskName}
                    </td>
                    <td
                      className={`px-4 md:px-6 py-4 text-sm md:text-base ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {task.assignee}
                    </td>
                    <td
                      className={`px-4 md:px-6 py-4 text-sm md:text-base ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {task.dueDate}
                    </td>
                    <td className='px-4 md:px-6 py-4'>
                      <span
                        className={`text-sm md:text-base font-medium ${task.statusColor}`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className='px-4 md:px-6 py-4'>
                      <button
                        onClick={() => handleViewTask(task.id)}
                        className={`text-sm md:text-base font-medium transition-colors ${
                          isDarkMode
                            ? 'text-[#F1CB68] hover:text-[#E5C158]'
                            : 'text-[#F1CB68] hover:text-[#E5C158]'
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
      </div>

      {/* Task Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto'
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-4xl rounded-2xl border ${
                isDarkMode
                  ? 'bg-[#1A1A1D] border-[#FFFFFF14]'
                  : 'bg-white border-gray-200'
              }`}
            >
              {/* Modal Header */}
              <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 md:p-6 border-b border-white/10'>
                <h2
                  className={`text-2xl md:text-3xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {selectedTask.taskName}
                </h2>
                <div className='flex items-center gap-3'>
                  <button
                    onClick={handleReassign}
                    className={`px-4 md:px-6 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-medium transition-all hover:opacity-90 cursor-pointer border border-[#F1CB68] bg-transparent hover:bg-[#F1CB68]/10 ${
                      isDarkMode ? 'text-[#F1CB68]' : 'text-[#F1CB68]'
                    }`}
                  >
                    Reassign
                  </button>
                  <button
                    onClick={handleMarkAsCompleted}
                    className='px-4 md:px-6 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-medium transition-all hover:opacity-90 cursor-pointer'
                    style={{
                      background:
                        'linear-gradient(90deg, #FFFFFF 0%, #F1CB68 100%)',
                      color: '#000000',
                    }}
                  >
                    Mark as Completed
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkMode
                        ? 'hover:bg-white/10 text-white'
                        : 'hover:bg-gray-100 text-gray-900'
                    }`}
                  >
                    <Image
                      src='/icons/close-x.svg'
                      alt='Close'
                      width={20}
                      height={20}
                      className={isDarkMode ? 'brightness-0 invert' : ''}
                    />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className='p-4 md:p-6'>
                {/* Key Details - Two Column Layout */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                  {/* Left Column */}
                  <div className='space-y-4'>
                    <div>
                      <label
                        className={`block text-sm md:text-base mb-2 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        Assignee
                      </label>
                      <p
                        className={`text-base md:text-lg ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {selectedTask.assignee}
                      </p>
                    </div>
                    <div>
                      <label
                        className={`block text-sm md:text-base mb-2 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        Status
                      </label>
                      <p
                        className={`text-base md:text-lg font-medium ${selectedTask.statusColor}`}
                      >
                        {selectedTask.status}
                      </p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className='space-y-4'>
                    <div>
                      <label
                        className={`block text-sm md:text-base mb-2 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        Due Date
                      </label>
                      <p
                        className={`text-base md:text-lg ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {selectedTask.dueDate}
                      </p>
                    </div>
                    <div>
                      <label
                        className={`block text-sm md:text-base mb-2 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        Priority
                      </label>
                      <p
                        className={`text-base md:text-lg ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {selectedTask.priority}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description Section */}
                <div className='pt-6 border-t border-white/10'>
                  <label
                    className={`block text-sm md:text-base mb-3 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Description
                  </label>
                  <p
                    className={`text-sm md:text-base leading-relaxed ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {selectedTask.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
