/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { getSearchServiceShim } from '../../services';
import { IAggConfig } from '../aggs/types';
import { KibanaDatatableColumnMeta } from '../../../../../../plugins/expressions/common/expression_types';
import { IndexPattern } from '../../../../../../plugins/data/public';

export const serializeAggConfig = (aggConfig: IAggConfig): KibanaDatatableColumnMeta => {
  return {
    type: aggConfig.type.name,
    indexPatternId: aggConfig.getIndexPattern().id,
    aggConfigParams: aggConfig.toJSON().params,
  };
};

interface DeserializeAggConfigParams {
  type: string;
  aggConfigParams: Record<string, any>;
  indexPattern: IndexPattern;
}

export const deserializeAggConfig = ({
  type,
  aggConfigParams,
  indexPattern,
}: DeserializeAggConfigParams) => {
  const { aggs } = getSearchServiceShim();
  const aggConfigs = aggs.createAggConfigs(indexPattern);
  const aggConfig = aggConfigs.createAggConfig({
    enabled: true,
    type,
    params: aggConfigParams,
  });
  return aggConfig;
};
