import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { EnrollmentService } from '../enrollment/enrollment.service';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(forwardRef(() => EnrollmentService))
    private readonly enrollmentService: EnrollmentService,
  ) {}

  sendNotification(studentName: string, message: string) {
    return {
      message: 'Notification sent successfully',
      student: studentName,
      notification: message,
    };
  }

  checkEnrollmentAndNotify(studentName: string, courseId: string) {
    const enrollmentData = this.enrollmentService.getEnrollments();

    return {
      message: 'Enrollment checked and notification processed',
      student: studentName,
      courseId,
      enrollments: enrollmentData,
    };
  }
}