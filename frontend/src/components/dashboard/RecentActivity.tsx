import { useState, useEffect } from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

interface Activity {
  id: string;
  type: 'video_watch' | 'course_progress' | 'comment' | 'like' | 'share';
  title: string;
  timestamp: string;
  details: string;
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('/api/user/activities', {
          headers: { 
            'Authorization': `Bearer ${token}` 
          }
        });
        setActivities(response.data);
      } catch (error) {
        console.error('Failed to fetch activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-200 rounded"></div>
        ))}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-8">
        <ClockIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No activity yet</h3>
        <p className="mt-1 text-sm text-gray-500">
          Start exploring courses and videos to see your activity here
        </p>
      </div>
    );
  }

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {activities.map((activity, activityIdx) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {activityIdx !== activities.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                    <ActivityIcon type={activity.type} />
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      {activity.title}{' '}
                      <span className="font-medium text-gray-900">{activity.details}</span>
                    </p>
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    <time dateTime={activity.timestamp}>
                      {formatTimestamp(activity.timestamp)}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ActivityIcon({ type }: { type: Activity['type'] }) {
  const iconClass = "h-5 w-5 text-white";
  
  switch (type) {
    case 'video_watch':
      return <ClockIcon className={iconClass} />;
    case 'course_progress':
      return <ClockIcon className={iconClass} />;
    case 'comment':
      return <ClockIcon className={iconClass} />;
    case 'like':
      return <ClockIcon className={iconClass} />;
    case 'share':
      return <ClockIcon className={iconClass} />;
    default:
      return <ClockIcon className={iconClass} />;
  }
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  // Less than 24 hours
  if (diff < 24 * 60 * 60 * 1000) {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      -Math.round(diff / (60 * 60 * 1000)),
      'hour'
    );
  }
  
  // Less than 30 days
  if (diff < 30 * 24 * 60 * 60 * 1000) {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      -Math.round(diff / (24 * 60 * 60 * 1000)),
      'day'
    );
  }
  
  // Default to date
  return date.toLocaleDateString();
}
