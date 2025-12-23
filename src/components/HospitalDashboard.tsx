/**
 * HospitalDashboard Component
 * 
 * Main dashboard interface for hospital staff to manage:
 * - Doctor availability status
 * - OPD queue and token system
 * - Laboratory operations and equipment status
 * - Patient alert notifications
 * 
 * @component
 * @returns {JSX.Element} Hospital Staff Dashboard
 */

import { useState, useEffect } from 'react';
import { Clock, User, Check, AlertTriangle, X } from 'lucide-react';
import type { Doctor, Lab, QueueStatus, DoctorStatus, LabStatus, EquipmentStatus } from '../types';

export default function HospitalDashboard() {
  // Time display updated every minute
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  );
  
  // Doctor availability management
  const [doctors, setDoctors] = useState<Doctor[]>([
    { id: 1, name: 'Dr. Rajesh Kumar', status: 'available' },
    { id: 2, name: 'Dr. Priya Sharma', status: 'busy' },
    { id: 3, name: 'Dr. Amit Patel', status: 'not-available' }
  ]);
  
  // OPD queue management
  const [currentToken, setCurrentToken] = useState(45);
  const [queueStatus, setQueueStatus] = useState<QueueStatus>('active');
  
  // Laboratory status tracking
  const [labs, setLabs] = useState<Lab[]>([
    { id: 1, name: 'Blood Test Lab', status: 'open', equipment: 'working' },
    { id: 2, name: 'X-Ray Department', status: 'busy', equipment: 'maintenance' },
    { id: 3, name: 'Ultrasound Lab', status: 'open', equipment: 'working' }
  ]);
  
  // Manual override and alert system states
  const [overrideDept, setOverrideDept] = useState('');
  const [overrideStatus, setOverrideStatus] = useState('');
  const [alertType, setAlertType] = useState('');
  const [affectedDept, setAffectedDept] = useState('');
  const [showConfirmSkip, setShowConfirmSkip] = useState(false);
  const [showConfirmSMS, setShowConfirmSMS] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const updateDoctorStatus = (doctorId: number, newStatus: DoctorStatus) => {
    setDoctors(doctors.map((doc: Doctor) => 
      doc.id === doctorId ? { ...doc, status: newStatus } : doc
    ));
    showSuccess('Doctor status updated');
  };

  const startQueue = () => {
    setQueueStatus('active');
    showSuccess('Queue started');
  };

  const pauseQueue = () => {
    setQueueStatus('paused');
    showSuccess('Queue paused');
  };

  const skipToken = () => {
    setShowConfirmSkip(true);
  };

  const confirmSkip = () => {
    setCurrentToken(currentToken + 1);
    setShowConfirmSkip(false);
    showSuccess('Token skipped');
  };

  const updateLabStatus = (labId: number, newStatus: LabStatus) => {
    setLabs(labs.map((lab: Lab) => 
      lab.id === labId ? { ...lab, status: newStatus } : lab
    ));
    showSuccess('Lab status updated');
  };

  const applyOverride = () => {
    if (overrideDept && overrideStatus) {
      showSuccess('Override applied successfully');
      setOverrideDept('');
      setOverrideStatus('');
    }
  };

  const sendAlert = (message: string) => {
    setAlertType(message);
    setShowConfirmSMS(true);
  };

  const confirmSendSMS = () => {
    showSuccess('Alert sent to 127 patients');
    setShowConfirmSMS(false);
    setAlertType('');
    setAffectedDept('');
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const getStatusColor = (status: DoctorStatus | LabStatus) => {
    switch(status) {
      case 'available':
      case 'open':
        return 'bg-green-600';
      case 'busy':
        return 'bg-orange-500';
      case 'not-available':
      case 'closed':
        return 'bg-red-600';
      default:
        return 'bg-gray-500';
    }
  };

  const getEquipmentIcon = (equipment: EquipmentStatus) => {
    switch(equipment) {
      case 'working':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'maintenance':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'out-of-service':
        return <X className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getEquipmentStatusText = (equipment: EquipmentStatus): string => {
    switch(equipment) {
      case 'working':
        return 'Working';
      case 'maintenance':
        return 'Maintenance';
      case 'out-of-service':
        return 'Out of Service';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* TN Government Header with Emblem Colors */}
      <div className="bg-gradient-to-r from-red-700 to-red-800 text-white shadow-lg">
        <div className="container mx-auto px-10 py-6">
          {/* Top bar with emblem */}
          <div className="flex items-center justify-center gap-6 pb-4 border-b border-red-600">
            <div className="flex items-center gap-5">
              <div className="w-24 h-24 rounded-full flex items-center justify-center p-1">
                <img 
                  src="/tamilnadu-government-logo-01.png" 
                  alt="Tamil Nadu Government Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold">தமிழ்நாடு அரசு | Government of Tamil Nadu</div>
                <div className="text-base opacity-90">சுகாதாரம் மற்றும் குடும்ப நல துறை | Health & Family Welfare Department</div>
              </div>
            </div>
          </div>
          
          {/* Main header */}
          <div className="flex justify-between items-center pt-5">
            <h1 className="text-3xl font-bold">Hospital Staff Dashboard | மருத்துவமனை பணியாளர் டாஷ்போர்டு</h1>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3 bg-red-900 px-5 py-3 rounded">
                <Clock className="w-6 h-6" />
                <span className="text-lg font-semibold">{currentTime}</span>
              </div>
              <div className="flex items-center gap-3 bg-red-900 px-5 py-3 rounded">
                <User className="w-6 h-6" />
                <span className="text-lg">Staff User</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="container mx-auto px-10 mt-8">
          <div className="bg-green-50 border-l-4 border-green-600 text-green-800 px-8 py-5 rounded shadow text-xl">
            <strong className="text-2xl">✓</strong> {successMessage}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-10 py-10">
        {/* Top Row - Three Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">
          {/* Doctor Status Panel */}
          <div className="bg-white rounded border-2 border-red-200 shadow-md overflow-hidden">
            <div className="bg-red-700 text-white px-8 py-5">
              <h2 className="text-2xl font-bold">DOCTOR STATUS | மருத்துவர் நிலை</h2>
            </div>
            <div className="p-8 space-y-6">
              {doctors.map(doctor => (
                <div key={doctor.id} className="pb-6 border-b-2 border-gray-200 last:border-b-0">
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-6 h-6 rounded-full ${getStatusColor(doctor.status)} border-2 border-gray-300`}></div>
                    <span className="font-bold text-gray-800 text-xl">{doctor.name}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={() => updateDoctorStatus(doctor.id, 'available')}
                      className={`py-4 px-4 rounded text-lg font-bold border-2 transition-colors ${
                        doctor.status === 'available'
                          ? 'bg-green-600 text-white border-green-700'
                          : 'bg-white border-gray-400 text-gray-700 hover:border-green-600'
                      }`}
                    >
                      Available
                    </button>
                    <button
                      onClick={() => updateDoctorStatus(doctor.id, 'busy')}
                      className={`py-2 px-2 rounded text-sm font-bold border-2 transition-colors ${
                        doctor.status === 'busy'
                          ? 'bg-orange-500 text-white border-orange-600'
                          : 'bg-white border-gray-400 text-gray-700 hover:border-orange-500'
                      }`}
                    >
                      Busy
                    </button>
                    <button
                      onClick={() => updateDoctorStatus(doctor.id, 'not-available')}
                      className={`py-2 px-2 rounded text-sm font-bold border-2 transition-colors ${
                        doctor.status === 'not-available'
                          ? 'bg-red-600 text-white border-red-700'
                          : 'bg-white border-gray-400 text-gray-700 hover:border-red-600'
                      }`}
                    >
                      Not Avail.
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* OPD Queue Management */}
          <div className="bg-white rounded border-2 border-red-200 shadow-md overflow-hidden">
            <div className="bg-red-700 text-white px-8 py-5">
              <h2 className="text-2xl font-bold">OPD QUEUE | வெளி நோயாளி வரிசை</h2>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <p className="text-lg font-bold text-gray-700 mb-4">CURRENT TOKEN | தற்போதைய டோக்கன்</p>
                <div className="border-4 border-blue-600 bg-blue-50 rounded-lg p-8 text-center">
                  <span className="text-9xl font-bold text-blue-700">{currentToken}</span>
                </div>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-700 mb-4">NEXT TOKEN | அடுத்த டோக்கன்</p>
                <div className="border-2 border-gray-400 bg-gray-50 rounded-lg p-5 text-center">
                  <span className="text-6xl font-bold text-gray-700">{currentToken + 1}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <button
                  onClick={startQueue}
                  disabled={queueStatus === 'active'}
                  className="py-5 px-5 rounded font-bold text-lg border-2 bg-green-600 text-white border-green-700 disabled:bg-gray-300 disabled:border-gray-400 disabled:cursor-not-allowed"
                >
                  START QUEUE
                </button>
                <button
                  onClick={pauseQueue}
                  disabled={queueStatus === 'paused'}
                  className="py-5 px-5 rounded font-bold text-lg border-2 bg-orange-500 text-white border-orange-600 disabled:bg-gray-300 disabled:border-gray-400 disabled:cursor-not-allowed"
                >
                  PAUSE QUEUE
                </button>
              </div>
              <button
                onClick={skipToken}
                className="w-full py-5 px-6 rounded font-bold text-lg border-2 bg-red-600 text-white border-red-700"
              >
                SKIP TOKEN
              </button>
              <div className="flex items-center gap-3 text-lg bg-gray-100 p-4 rounded border border-gray-300">
                <div className={`w-4 h-4 rounded-full ${queueStatus === 'active' ? 'bg-green-600' : 'bg-orange-500'}`}></div>
                <span className="font-semibold text-gray-800">Status: {queueStatus === 'active' ? 'Queue Active' : 'Queue Paused'}</span>
              </div>
            </div>
          </div>

          {/* Lab Status Management */}
          <div className="bg-white rounded border-2 border-red-200 shadow-md overflow-hidden">
            <div className="bg-red-700 text-white px-8 py-5">
              <h2 className="text-2xl font-bold">LAB STATUS | ஆய்வக நிலை</h2>
            </div>
            <div className="p-8 space-y-6">
              {labs.map(lab => (
                <div key={lab.id} className="pb-6 border-b-2 border-gray-200 last:border-b-0">
                  <div className="font-bold text-gray-800 mb-4 text-xl">{lab.name}</div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <button
                      onClick={() => updateLabStatus(lab.id, 'open')}
                      className={`py-4 px-4 rounded text-lg font-bold border-2 transition-colors ${
                        lab.status === 'open'
                          ? 'bg-green-600 text-white border-green-700'
                          : 'bg-white border-gray-400 text-gray-700 hover:border-green-600'
                      }`}
                    >
                      Open
                    </button>
                    <button
                      onClick={() => updateLabStatus(lab.id, 'busy')}
                      className={`py-2 px-2 rounded text-sm font-bold border-2 transition-colors ${
                        lab.status === 'busy'
                          ? 'bg-orange-500 text-white border-orange-600'
                          : 'bg-white border-gray-400 text-gray-700 hover:border-orange-500'
                      }`}
                    >
                      Busy
                    </button>
                    <button
                      onClick={() => updateLabStatus(lab.id, 'closed')}
                      className={`py-2 px-2 rounded text-sm font-bold border-2 transition-colors ${
                        lab.status === 'closed'
                          ? 'bg-red-600 text-white border-red-700'
                          : 'bg-white border-gray-400 text-gray-700 hover:border-red-600'
                      }`}
                    >
                      Closed
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-lg text-gray-700 bg-gray-50 p-4 rounded border border-gray-300">
                    {getEquipmentIcon(lab.equipment)}
                    <span className="font-semibold">Equipment: {getEquipmentStatusText(lab.equipment)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row - Override & Alerts */}
        <div className="bg-white rounded border-2 border-red-200 shadow-md overflow-hidden">
          <div className="bg-red-700 text-white px-8 py-5">
            <h2 className="text-2xl font-bold">MANUAL OVERRIDE & ALERTS | கைமுறை மேலெழுதல் & எச்சரிக்கைகள்</h2>
          </div>
          <div className="p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Manual Override */}
              <div className="border-2 border-gray-300 rounded-lg p-8 bg-amber-50">
                <h3 className="font-bold text-gray-800 mb-5 text-2xl border-b-2 border-gray-300 pb-4">OVERRIDE AI PREDICTION</h3>
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="override-dept" className="block text-lg font-bold text-gray-700 mb-3">Select Department</label>
                      <select
                        id="override-dept"
                        value={overrideDept}
                        onChange={(e) => setOverrideDept(e.target.value)}
                        className="w-full border-2 border-gray-400 rounded px-5 py-4 font-semibold text-lg"
                      >
                        <option value="">Choose...</option>
                        <option value="opd">OPD</option>
                        <option value="blood-lab">Blood Test Lab</option>
                        <option value="xray">X-Ray Department</option>
                        <option value="ultrasound">Ultrasound Lab</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="override-status" className="block text-lg font-bold text-gray-700 mb-3">Override Status</label>
                      <select
                        id="override-status"
                        value={overrideStatus}
                        onChange={(e) => setOverrideStatus(e.target.value)}
                        className="w-full border-2 border-gray-400 rounded px-5 py-4 font-semibold text-lg"
                      >
                        <option value="">Choose...</option>
                        <option value="open">Open</option>
                        <option value="busy">Busy</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="override-notes" className="block text-lg font-bold text-gray-700 mb-3">Notes (optional)</label>
                    <textarea
                      id="override-notes"
                      className="w-full border-2 border-gray-400 rounded px-5 py-4 text-lg"
                      rows={4}
                      placeholder="Enter notes..."
                    ></textarea>
                  </div>
                  <button
                    onClick={applyOverride}
                    className="w-full py-5 px-6 rounded font-bold text-lg border-2 bg-yellow-500 text-gray-900 border-yellow-600"
                  >
                    APPLY OVERRIDE
                  </button>
                </div>
              </div>

              {/* Send Patient Alerts */}
              <div className="border-2 border-gray-300 rounded-lg p-8 bg-amber-50">
                <h3 className="font-bold text-gray-800 mb-5 text-2xl border-b-2 border-gray-300 pb-4">SEND PATIENT ALERTS</h3>
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="alert-type" className="block text-lg font-bold text-gray-700 mb-3">Alert Type</label>
                      <select
                        id="alert-type"
                        value={alertType}
                        onChange={(e) => setAlertType(e.target.value)}
                        className="w-full border-2 border-gray-400 rounded px-5 py-4 font-semibold text-lg"
                      >
                        <option value="">Choose...</option>
                        <option value="delay">Delay Notice</option>
                        <option value="closure">Closure Notice</option>
                        <option value="custom">Custom Message</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="affected-dept" className="block text-lg font-bold text-gray-700 mb-3">Affected Dept.</label>
                      <select
                        id="affected-dept"
                        value={affectedDept}
                        onChange={(e) => setAffectedDept(e.target.value)}
                        className="w-full border-2 border-gray-400 rounded px-5 py-4 font-semibold text-lg"
                      >
                        <option value="">Choose...</option>
                        <option value="all">All Departments</option>
                        <option value="opd">OPD</option>
                        <option value="labs">All Labs</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-700 mb-4">Quick Messages:</p>
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={() => sendAlert('Doctor Delayed')}
                        className="py-4 px-5 rounded bg-white border-2 border-gray-400 text-gray-800 text-lg font-bold hover:border-blue-600"
                      >
                        Doctor Delayed
                      </button>
                      <button
                        onClick={() => sendAlert('Lab Closed')}
                        className="py-4 px-5 rounded bg-white border-2 border-gray-400 text-gray-800 text-lg font-bold hover:border-blue-600"
                      >
                        Lab Closed
                      </button>
                      <button
                        onClick={() => sendAlert('Queue Paused')}
                        className="py-4 px-5 rounded bg-white border-2 border-gray-400 text-gray-800 text-lg font-bold hover:border-blue-600"
                      >
                        Queue Paused
                      </button>
                      <button
                        onClick={() => sendAlert('Custom')}
                        className="py-4 px-5 rounded bg-white border-2 border-gray-400 text-gray-800 text-lg font-bold hover:border-blue-600"
                      >
                        Custom...
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowConfirmSMS(true)}
                    className="w-full py-5 px-6 rounded font-bold text-lg border-2 bg-red-600 text-white border-red-700"
                  >
                    SEND SMS ALERT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skip Token Confirmation Modal */}
      {showConfirmSkip && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg border-4 border-red-600 p-10 max-w-xl w-full shadow-2xl">
            <div className="bg-red-700 text-white px-8 py-4 -mx-10 -mt-10 mb-8 rounded-t">
              <h3 className="text-3xl font-bold">Confirm Skip Token</h3>
            </div>
            <p className="text-gray-800 mb-10 font-semibold text-2xl">Are you sure you want to skip token {currentToken}?</p>
            <div className="flex gap-5">
              <button
                onClick={() => setShowConfirmSkip(false)}
                className="flex-1 py-5 px-6 rounded border-2 border-gray-400 text-gray-800 text-lg font-bold hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmSkip}
                className="flex-1 py-5 px-6 rounded bg-red-600 text-white text-lg font-bold border-2 border-red-700"
              >
                Confirm Skip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SMS Alert Confirmation Modal */}
      {showConfirmSMS && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg border-4 border-red-600 p-10 max-w-xl w-full shadow-2xl">
            <div className="bg-red-700 text-white px-8 py-4 -mx-10 -mt-10 mb-8 rounded-t">
              <h3 className="text-3xl font-bold">Confirm Send SMS</h3>
            </div>
            <p className="text-gray-800 mb-10 font-semibold text-2xl">Send alert "{alertType}" to all affected patients?</p>
            <div className="flex gap-5">
              <button
                onClick={() => setShowConfirmSMS(false)}
                className="flex-1 py-5 px-6 rounded border-2 border-gray-400 text-gray-800 text-lg font-bold hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmSendSMS}
                className="flex-1 py-5 px-6 rounded bg-red-600 text-white text-lg font-bold border-2 border-red-700"
              >
                Send SMS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

