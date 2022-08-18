import { getIpRequest } from '../../../../infrastructure/utils/commons/get-ip-request';
import {
  Controller,
  Get,
  Param,
  Response,
  ParseUUIDPipe,
  NotFoundException,
  Query,
  UseGuards,
  ParseIntPipe,
  Req,
  Res,
  Headers,
  ParseBoolPipe,
} from '@nestjs/common';
import { reply } from '../../../../infrastructure/utils/reply';
import { useCatch } from '../../../../infrastructure/utils/use-catch';
import { JwtAuthGuard } from '../../../user/middleware';
import {
  GetOneVoucherDto,
  VoucherableType,
} from '../../dto/validation-voucher.dto';
import { FindOneVoucherByService } from '../../services/query/find-one-voucher-by.service';
import { GetOnUserVoucher } from '../../services/use-cases/get-on-user-voucher';
import { FilterQueryDto } from '../../../../infrastructure/utils/filter-query/filter-query.dto';
import { RequestPaginationDto } from '../../../../infrastructure/utils/pagination/request-pagination.dto';
import { FindVoucherService } from '../../services/query/find-voucher.service';
import {
  VoucherableTypeDto,
  getOneByNumberVoucherType,
} from '../../dto/validation-voucher.dto';

@Controller('re')
export class GetOneOrMultipleExternalVoucherController {
  constructor(
    private readonly getOnUserVoucher: GetOnUserVoucher,
    private readonly findVoucherService: FindVoucherService,
  ) {}

  @Get(`/voucher`)
  async getAllVouchers(
    @Res() res,
    @Req() req,
    @Query() pagination: RequestPaginationDto,
    @Query() filterQuery: FilterQueryDto,
    @Query() type: VoucherableTypeDto,
    @Query('is_paginate', ParseBoolPipe) is_paginate: boolean,
  ) {
    const { user } = req;
    const [errors, results] = await useCatch(
      this.findVoucherService.findAllVouchers({
        is_paginate,
        filterQuery,
        pagination,
        type: getOneByNumberVoucherType(Number(type?.voucher_type)),
        option1: { userId: user?.id },
      }),
    );
    if (errors) {
      throw new NotFoundException(errors);
    }
    return reply({ res, results: results });
  }

  @Get(`/voucher/show/:code`)
  async getOneByUuidOrrCode(
    @Res() res,
    @Req() req,
    @Param() getOneVoucherDto: GetOneVoucherDto,
    @Headers('User-Agent') userAgent: string,
  ) {
    const [error, result] = await useCatch(
      this.getOnUserVoucher.executeExtern({
        ...getOneVoucherDto,
        ipLocation: getIpRequest(req),
        userAgent,
        user: req.user,
      }),
    );
    if (error) {
      throw new NotFoundException(error);
    }
    return reply({ res, results: result });
  }
}