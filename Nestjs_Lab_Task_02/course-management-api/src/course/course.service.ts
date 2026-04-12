import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  private courses: any[] = [];

  getAllCourses() {
    return {
      message: 'All courses fetched successfully',
      data: this.courses,
    };
  }

  getCourseById(id: string) {
    const course = this.courses.find((item) => item.id === id);

    if (!course) {
      return {
        message: 'Course not found',
        id,
      };
    }

    return {
      message: 'Course fetched successfully',
      data: course,
    };
  }

  createCourse(dto: CreateCourseDto) {
    const newCourse = {
      id: (this.courses.length + 1).toString(),
      ...dto,
    };

    this.courses.push(newCourse);

    return {
      message: 'Course created successfully',
      data: newCourse,
    };
  }

  updateCourse(id: string, dto: UpdateCourseDto) {
    const index = this.courses.findIndex((item) => item.id === id);

    if (index === -1) {
      return {
        message: 'Course not found',
        id,
      };
    }

    const updatedCourse = {
      id,
      ...dto,
    };

    this.courses[index] = updatedCourse;

    return {
      message: 'Course updated successfully',
      id,
      data: updatedCourse,
    };
  }

  patchCourse(id: string, dto: UpdateCourseDto) {
    const index = this.courses.findIndex((item) => item.id === id);

    if (index === -1) {
      return {
        message: 'Course not found',
        id,
      };
    }

    this.courses[index] = {
      ...this.courses[index],
      ...dto,
    };

    return {
      message: 'Course patched successfully',
      id,
      data: this.courses[index],
      updatedFields: Object.keys(dto),
    };
  }

  deleteCourse(id: string) {
    const index = this.courses.findIndex((item) => item.id === id);

    if (index === -1) {
      return {
        message: 'Course not found',
        id,
      };
    }

    this.courses.splice(index, 1);

    return {
      message: 'Course deleted successfully',
      id,
    };
  }

  uploadCourseMaterial(id: string, file: Express.Multer.File) {
    return {
      message: 'Material uploaded successfully',
      courseId: id,
      filename: file.filename,
      path: `uploads/${file.filename}`,
    };
  }
}