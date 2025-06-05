/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Users, Calendar, Camera, CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();
  
  // Mock data for demonstration
  const [users, setUsers] = useState([
    { id: '1', name: 'John Doe', email: 'john@example.com', eventsCreated: 5 },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', eventsCreated: 3 },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', eventsCreated: 0 },
  ]);
  
  const [events, setEvents] = useState([
    { id: '1', name: 'Wedding', creator: 'John Doe', date: new Date(), photoCount: 45 },
    { id: '2', name: 'Birthday Party', creator: 'Jane Smith', date: new Date(), photoCount: 23 },
    { id: '3', name: 'Company Retreat', creator: 'John Doe', date: new Date(), photoCount: 67 },
  ]);
  
  const [payments, setPayments] = useState([
    { id: 'pay_123', user: 'John Doe', amount: 29.99, date: new Date(), status: 'completed' },
    { id: 'pay_456', user: 'Jane Smith', amount: 49.99, date: new Date(), status: 'completed' },
    { id: 'pay_789', user: 'Bob Johnson', amount: 29.99, date: new Date(), status: 'failed' },
  ]);
  
  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  
  if (!currentUser?.isAdmin) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-500">Access Denied</h1>
        <p className="mb-6">You do not have permission to view this page.</p>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-purple-800 text-white p-4">
        <h1 className="text-2xl font-bold">Admin Control Panel</h1>
      </div>
      
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center px-4 py-3 ${
            activeTab === 'users' 
              ? 'border-b-2 border-purple-500 text-purple-700 font-medium' 
              : 'text-gray-600 hover:text-purple-700'
          }`}
        >
          <Users size={18} className="mr-2" />
          Users
        </button>
        
        <button
          onClick={() => setActiveTab('events')}
          className={`flex items-center px-4 py-3 ${
            activeTab === 'events' 
              ? 'border-b-2 border-purple-500 text-purple-700 font-medium' 
              : 'text-gray-600 hover:text-purple-700'
          }`}
        >
          <Calendar size={18} className="mr-2" />
          Events
        </button>
        
        <button
          onClick={() => setActiveTab('photos')}
          className={`flex items-center px-4 py-3 ${
            activeTab === 'photos' 
              ? 'border-b-2 border-purple-500 text-purple-700 font-medium' 
              : 'text-gray-600 hover:text-purple-700'
          }`}
        >
          <Camera size={18} className="mr-2" />
          Photos
        </button>
        
        <button
          onClick={() => setActiveTab('payments')}
          className={`flex items-center px-4 py-3 ${
            activeTab === 'payments' 
              ? 'border-b-2 border-purple-500 text-purple-700 font-medium' 
              : 'text-gray-600 hover:text-purple-700'
          }`}
        >
          <CreditCard size={18} className="mr-2" />
          Payments
        </button>
      </div>
      
      <div className="p-6">
        {activeTab === 'users' && (
          <div>
            <h2 className="text-xl font-bold mb-4">User Management</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Events Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map(user => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.eventsCreated}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-purple-600 hover:text-purple-900 mr-3">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'events' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Event Management</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Creator
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Photos
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {events.map(event => (
                    <tr key={event.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{event.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{event.creator}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Intl.DateTimeFormat('en-US').format(event.date)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{event.photoCount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-purple-600 hover:text-purple-900 mr-3">
                          View
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'photos' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Photo Management</h2>
            <p className="text-gray-600 mb-4">
              This section would display a gallery of all uploaded photos across events,
              with options to filter by event, date, or user.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <div key={num} className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
                  <p className="text-gray-500">Photo {num}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-center">
              <button className="text-purple-600 hover:text-purple-800">
                Load More Photos
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'payments' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Payment Management</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payments.map(payment => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-mono text-gray-900">{payment.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{payment.user}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${payment.amount.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Intl.DateTimeFormat('en-US').format(payment.date)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          payment.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;