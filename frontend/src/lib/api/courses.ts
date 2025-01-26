import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  price: number;
  thumbnail?: string;
  categories?: string[];
  enrollmentCount?: number;
  reviewCount?: number;
}

export interface CourseReview {
  id: string;
  rating: number;
  comment: string;
  user: {
    id: string;
    name: string;
    image?: string;
  };
  createdAt: string;
}

export const courseApi = {
  async getAllCourses(): Promise<Course[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/courses`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch courses');
    }
  },

  async getCourseById(courseId: string): Promise<Course> {
    try {
      const response = await axios.get(`${API_BASE_URL}/courses/${courseId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch course details');
    }
  },

  async enrollInCourse(courseId: string, enrollmentType: 'FULL' | 'INSTALLMENT') {
    try {
      const response = await axios.post(`${API_BASE_URL}/courses/enroll`, {
        courseId,
        enrollmentType
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || 'Course enrollment failed'
      );
    }
  },

  async getCourseReviews(courseId: string): Promise<CourseReview[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/courses/${courseId}/reviews`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch course reviews');
    }
  },

  async submitCourseReview(
    courseId: string, 
    rating: number, 
    comment: string
  ): Promise<CourseReview> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/courses/${courseId}/reviews`, 
        { rating, comment }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || 'Review submission failed'
      );
    }
  }
};
