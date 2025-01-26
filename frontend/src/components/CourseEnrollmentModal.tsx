'use client';

import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { courseApi } from '@/lib/api/courses';

interface CourseEnrollmentModalProps {
  courseId: string;
  courseTitle: string;
  price: number;
  isOpen: boolean;
  onClose: () => void;
  onEnrollmentSuccess?: () => void;
}

export default function CourseEnrollmentModal({
  courseId, 
  courseTitle, 
  price, 
  isOpen, 
  onClose,
  onEnrollmentSuccess
}: CourseEnrollmentModalProps) {
  const [enrollmentMethod, setEnrollmentMethod] = useState<'FULL' | 'INSTALLMENT'>('FULL');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleEnrollment = async () => {
    setLoading(true);
    setError(null);

    try {
      const enrollment = await courseApi.enrollInCourse(courseId, enrollmentMethod);
      
      setSuccess(true);
      onEnrollmentSuccess?.();
      
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog 
        as="div" 
        className="relative z-50" 
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {success ? (
                  <div className="text-center">
                    <CheckIcon className="mx-auto h-16 w-16 text-green-500" />
                    <h3 className="text-2xl font-bold text-blue-900 mt-4">
                      Enrollment Successful!
                    </h3>
                    <p className="text-blue-700 mt-2">
                      You've been enrolled in {courseTitle}
                    </p>
                  </div>
                ) : (
                  <>
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-bold leading-6 text-blue-900"
                    >
                      Enroll in {courseTitle}
                    </Dialog.Title>
                    <div className="mt-4">
                      <p className="text-blue-700">
                        Choose your enrollment method:
                      </p>

                      <div className="mt-4 space-y-4">
                        <div 
                          className={`
                            border rounded-lg p-4 cursor-pointer transition
                            ${enrollmentMethod === 'FULL' 
                              ? 'border-blue-600 bg-blue-50' 
                              : 'border-gray-300 hover:bg-gray-50'
                            }
                          `}
                          onClick={() => setEnrollmentMethod('FULL')}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-lg font-semibold text-blue-900">
                                Full Payment
                              </h4>
                              <p className="text-blue-700">
                                Pay the entire course fee upfront
                              </p>
                            </div>
                            <span className="text-xl font-bold text-green-600">
                              ${price}
                            </span>
                          </div>
                        </div>

                        <div 
                          className={`
                            border rounded-lg p-4 cursor-pointer transition
                            ${enrollmentMethod === 'INSTALLMENT' 
                              ? 'border-blue-600 bg-blue-50' 
                              : 'border-gray-300 hover:bg-gray-50'
                            }
                          `}
                          onClick={() => setEnrollmentMethod('INSTALLMENT')}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-lg font-semibold text-blue-900">
                                Installment Plan
                              </h4>
                              <p className="text-blue-700">
                                Split payment into 3 monthly installments
                              </p>
                            </div>
                            <span className="text-xl font-bold text-green-600">
                              ${(price * 1.1 / 3).toFixed(2)}/month
                            </span>
                          </div>
                        </div>
                      </div>

                      {error && (
                        <div className="mt-4 bg-red-50 border border-red-300 text-red-700 px-4 py-2 rounded">
                          {error}
                        </div>
                      )}

                      <div className="mt-6 flex space-x-4">
                        <button
                          type="button"
                          className="inline-flex justify-center w-full rounded-lg border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={handleEnrollment}
                          disabled={loading}
                        >
                          {loading ? 'Processing...' : 'Confirm Enrollment'}
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center w-full rounded-lg border border-transparent px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={onClose}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
