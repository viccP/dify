import type { FC } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import useConfig from './use-config'
import ApiInput from './components/api-input'
import KeyValue from './components/key-value'
import EditBody from './components/edit-body'
import AuthorizationModal from './components/authorization'
import type { HttpNodeType } from './types'
import VarList from '@/app/components/workflow/nodes/_base/components/variable/var-list'
import Field from '@/app/components/workflow/nodes/_base/components/field'
import AddButton from '@/app/components/base/button/add-button'
import Split from '@/app/components/workflow/nodes/_base/components/split'
import OutputVars, { VarItem } from '@/app/components/workflow/nodes/_base/components/output-vars'
import { Settings01 } from '@/app/components/base/icons/src/vender/line/general'
import type { NodePanelProps } from '@/app/components/workflow/types'
import BeforeRunForm from '@/app/components/workflow/nodes/_base/components/before-run-form'
import ResultPanel from '@/app/components/workflow/run/result-panel'

const i18nPrefix = 'workflow.nodes.http'

const Panel: FC<NodePanelProps<HttpNodeType>> = ({
  id,
  data,
}) => {
  const { t } = useTranslation()

  const {
    readOnly,
    inputs,
    handleVarListChange,
    handleAddVariable,
    filterVar,
    handleMethodChange,
    handleUrlChange,
    headers,
    setHeaders,
    addHeader,
    isHeaderKeyValueEdit,
    toggleIsHeaderKeyValueEdit,
    params,
    setParams,
    addParam,
    isParamKeyValueEdit,
    toggleIsParamKeyValueEdit,
    setBody,
    isShowAuthorization,
    showAuthorization,
    hideAuthorization,
    setAuthorization,
    // single run
    isShowSingleRun,
    hideSingleRun,
    runningStatus,
    handleRun,
    handleStop,
    varInputs,
    inputVarValues,
    setInputVarValues,
    runResult,
  } = useConfig(id, data)

  return (
    <div className='mt-2'>
      <div className='px-4 pb-4 space-y-4'>
        <Field
          title={t(`${i18nPrefix}.inputVars`)}
          operations={
            !readOnly ? <AddButton onClick={handleAddVariable} /> : undefined
          }
        >
          <VarList
            nodeId={id}
            readonly={readOnly}
            list={inputs.variables}
            onChange={handleVarListChange}
            filterVar={filterVar}
          />
        </Field>
        <Field
          title={t(`${i18nPrefix}.api`)}
          operations={
            <div
              onClick={showAuthorization}
              className={cn(!readOnly && 'cursor-pointer', 'flex items-center h-6 space-x-1')}
            >
              {!readOnly && <Settings01 className='w-3 h-3 text-gray-500' />}
              <div className='text-xs font-medium text-gray-500'>
                {t(`${i18nPrefix}.authorization.authorization`)}
                <span className='ml-1 text-gray-700'>{t(`${i18nPrefix}.authorization.${inputs.authorization.type}`)}</span>
              </div>
            </div>
          }
        >
          <ApiInput
            readonly={readOnly}
            method={inputs.method}
            onMethodChange={handleMethodChange}
            url={inputs.url}
            onUrlChange={handleUrlChange}
          />
        </Field>
        <Field
          title={t(`${i18nPrefix}.headers`)}
        >
          <KeyValue
            list={headers}
            onChange={setHeaders}
            onAdd={addHeader}
            readonly={readOnly}
            isKeyValueEdit={isHeaderKeyValueEdit}
            toggleKeyValueEdit={toggleIsHeaderKeyValueEdit}
          />
        </Field>
        <Field
          title={t(`${i18nPrefix}.params`)}
        >
          <KeyValue
            list={params}
            onChange={setParams}
            onAdd={addParam}
            readonly={readOnly}
            isKeyValueEdit={isParamKeyValueEdit}
            toggleKeyValueEdit={toggleIsParamKeyValueEdit}
          />
        </Field>
        <Field
          title={t(`${i18nPrefix}.body`)}
        >
          <EditBody
            readonly={readOnly}
            payload={inputs.body}
            onChange={setBody}
          />
        </Field>
      </div>
      {(isShowAuthorization && !readOnly) && (
        <AuthorizationModal
          isShow
          onHide={hideAuthorization}
          payload={inputs.authorization}
          onChange={setAuthorization}
        />
      )}
      <Split />
      <div className='px-4 pt-4 pb-2'>
        <OutputVars>
          <>
            <VarItem
              name='body'
              type='string'
              description={t(`${i18nPrefix}.outputVars.body`)}
            />
            <VarItem
              name='status_code'
              type='string'
              description={t(`${i18nPrefix}.outputVars.statusCode`)}
            />
            <VarItem
              name='headers'
              type='object'
              description={t(`${i18nPrefix}.outputVars.headers`)}
            />
            <VarItem
              name='files'
              type='Array[File]'
              description={t(`${i18nPrefix}.outputVars.files`)}
            />
          </>
        </OutputVars>
      </div>
      {isShowSingleRun && (
        <BeforeRunForm
          nodeName={inputs.title}
          onHide={hideSingleRun}
          forms={[
            {
              inputs: varInputs,
              values: inputVarValues,
              onChange: setInputVarValues,
            },
          ]}
          runningStatus={runningStatus}
          onRun={handleRun}
          onStop={handleStop}
          result={<ResultPanel {...runResult} showSteps={false} />}
        />
      )}
    </div >
  )
}

export default React.memo(Panel)
