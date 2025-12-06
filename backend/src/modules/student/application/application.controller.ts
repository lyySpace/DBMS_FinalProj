import { Controller, Get, Post, Req, Body, BadRequestException, 
	UploadedFile, UseInterceptors, UseGuards, Delete, Param } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { ApplicationService } from './application.service';
import * as fs from 'fs';
import { applicationMulterOptions } from './storage.config';
import { extname } from 'path';
import { CreateApplicationDto } from './dto/create-application.dto';

@ApiTags('Application')
@Controller('student/application')
export class ApplicationController {
	constructor(private readonly applicationService: ApplicationService) {}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles('student')
	@Get('my')
	@ApiOperation({ summary: 'Get student applications' })
	@ApiResponse({ status: 200, description: 'Applications retrieved successfully.' })
	async getApplications(@Req() req: any) {
		const userId = req.user.sub;
		return this.applicationService.getMyApplications(userId);
	}
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles('student')
	@ApiOperation({ summary: 'Cancel a student application' })
	@ApiResponse({ status: 200, description: 'Application canceled successfully.' })
	@Delete(':resourceId')
	async cancelApplication(
		@Req() req: any,
		@Param('resourceId') resourceId: string
	) {
		const userId = req.user.sub;
		return this.applicationService.cancelApplication(userId, resourceId);
	}

  @ApiOperation({ summary: 'Create a new application' })
  @ApiResponse({ status: 201, description: 'Application created successfully.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('student')
  @Post('create')
  @UseInterceptors(FileInterceptor('file', applicationMulterOptions))
  async createApplication(
    @Req() req,
    @Body() dto: CreateApplicationDto,
    @UploadedFile() file?
  ) {
    return this.applicationService.createApplication(req.user.sub, dto, file);
  }
}
