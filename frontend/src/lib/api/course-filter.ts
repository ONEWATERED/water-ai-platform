import axios from 'axios';
import { Course } from './courses';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface CourseFilterOptions {
  categories: string[];
  difficulties: string[];
  priceRange: {
    min: number;
    max: number;
  };
}

export interface CourseFilterParams {
  search?: string;
  categories?: string[];
  difficulties?: string[];
  priceRange?: {
    min?: number;
    max?: number;
  };
  sortBy?: 'PRICE_ASC' | 'PRICE_DESC' | 'RATING' | 'POPULARITY';
  page?: number;
  pageSize?: number;
}

export interface CourseFilterResult {
  courses: Course[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalCourses: number;
    totalPages: number;
  };
}

export const courseFilterApi = {
  async getFilterOptions(): Promise<CourseFilterOptions> {
    try {
      const response = await axios.get(`${API_BASE_URL}/filter-options`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch filter options');
    }
  },

  async filterCourses(params: CourseFilterParams = {}): Promise<CourseFilterResult> {
    try {
      const response = await axios.get(`${API_BASE_URL}/courses`, { 
        params: {
          ...params,
          page: params.page || 1,
          pageSize: params.pageSize || 10
        } 
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || 'Failed to filter courses'
      );
    }
  }
};
