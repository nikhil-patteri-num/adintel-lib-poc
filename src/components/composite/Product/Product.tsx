import React, { useState } from 'react';
import './Prdouct.scss';
import { FormGroup, FormItemLabel, Dropdown, TextArea, CheckboxInput, TextInput, inputType } from '../../core';
import { DynamicSearch } from '../../core/DynamicRenderer/DynamicSearch/DynamicSearch';
import { getDropdownCompatibleData } from '../../utility/CommonMethods';

export interface IProductProps {
  isEditmode: boolean;
  isProductmode: boolean;
  dropdownData:any;
}

export const Product = (props: IProductProps) => {
  const { isEditmode, isProductmode,dropdownData} = props;
  const [ProductType, setProductType] = useState();
  const [DescriptorType, setDescriptorType] = useState();
  const [Brand, setBrand] = useState();
  const [Descriptor, setDescriptor] = useState();
  const [ProductName, setProductName] = useState();
  const [LicenseeBrand, setLicenseeBrand] = useState();
  const [LicensorBrand, setLicensorBrand] = useState();
  const [Rank, setRank] = useState(true);
  const [ProductTags, setProductTags] = useState();
  const [Status, setStatus] = useState();
  const [Referredto, setReferredto] = useState();
  const [Markets, setMarkets] = useState();
  const [isNationalChecked, setIsNational] = useState(true);
  const [formData, setFormData] = useState({
    descriptorName: '',
    descriptorsType: '',
    descriptorTypeId: null,
    status: 0,
    referredTo: '',
    newComment: '',
    createUser: '',
    createDate: '',
    changeUser: '',
    changeDate: '',
    previousComments: ''
  });

  // function onClassSearchEvent(arg0: any) {
  //   debugger;
  //   return arg0;
  // }

  const handleOnChange = (arg1: string) => {
    debugger;
    return arg1;
  }
  return (
    <>
      <div className={`${isProductmode ? 'container' : 'content'}`}>
        <div className={`${isProductmode ? 'pleft' : 'left'}`}>
          <div className={`${isProductmode ? 'childprd' : 'child'}`} >
            <FormGroup>
              <FormItemLabel isMandatory>Class Name</FormItemLabel>
              {/* <Dropdown
                id={'ClassName'}
                value={ClassName}
                options={[]}
                onClick={(value: any) => setClassName(value)}
                placeholder={'Search for Class'}
              /> */}
              <DynamicSearch
                id={'classId'}
                name={'classCode'}
                fieldName={'classCode'}
                value={formData.descriptorTypeId}
                setValue={selectedOption =>
                  setFormData({
                    ...formData,
                    descriptorsType: selectedOption.value
                  })
                }
                 getMultiselectSearchResults={handleOnChange}
                commonData={
                  dropdownData?.classNameDropdownList
                    ? {
                        entities: getDropdownCompatibleData(
                          dropdownData?.classNameDropdownList,
                          {
                            label: 'classCode',
                            value: 'classCode'
                          }
                        )
                      }
                    : { entities: [] }
                }
                disabled={false}
              />
            </FormGroup>
            <div className={`${!isProductmode ? 'hide' : ''}`}>
              <div className='role-container-right'>
                <p>
                  <a href="#b" className='removeunderline'>General guidlines</a>
                  <a href="#b" className='heyperlink removeunderline'>Category Instructions</a></p>
              </div>
            </div>
          </div>
          <div className={`${isProductmode ? 'childprd' : 'child'}`} >
            <FormGroup>
              <FormItemLabel isMandatory>Product Type</FormItemLabel>
              <Dropdown
                id={'ProductType'}
                value={ProductType}
                options={[]}
                onClick={(value: any) => setProductType(value)}
                placeholder={'Search for Product Type'}
              />
            </FormGroup>
          </div>
          <div className={`${isProductmode ? 'childprd' : 'child'}`} >
            <FormGroup>
              <FormItemLabel>Descriptor Type(s)</FormItemLabel>
              <Dropdown
                id={'DescriptorType'}
                value={DescriptorType}
                options={[]}
                onClick={(value: any) => setDescriptorType(value)}
                placeholder={'Search for Descriptor Type'}
              />
            </FormGroup>
          </div>
          <div className={`${isProductmode ? 'childprd' : 'child'}`} >
            <FormGroup>
              <FormItemLabel>Descriptor(s)</FormItemLabel>
              <Dropdown
                id={'Descriptor'}
                value={Descriptor}
                options={[]}
                onClick={(value: any) => setDescriptor(value)}
                placeholder={'Search for Descriptor Type'}
              />
            </FormGroup>
          </div>
          <div className={`${isProductmode ? 'childprd' : 'child'}`} >
            <FormGroup>
              <FormItemLabel isMandatory>Product Name</FormItemLabel>
              <Dropdown
                id={'ProductName'}
                value={ProductName}
                options={[]}
                onClick={(value: any) => setProductName(value)}
                placeholder={'Search for ProductName'}
              />
            </FormGroup>
          </div>
          <div className={`${isProductmode ? 'childprd' : 'child'}`}>
            <FormGroup>
              <FormItemLabel isMandatory>Brand</FormItemLabel>
              <Dropdown
                id={'Brand'}
                options={[]}
                value={Brand}
                onClick={(value: any) => setBrand(value)}
                placeholder={'Search for Brand'}
              />
            </FormGroup>
          </div>
          {(!isProductmode) && (
            <div className='child'>
              <FormGroup>
                <FormItemLabel>Licensee Brand</FormItemLabel>
                <Dropdown
                  id={'LicenseeBrand'}
                  value={LicenseeBrand}
                  options={[]}
                  onClick={(value: any) => setLicenseeBrand(value)}
                  placeholder={'Select a Licensee Brand'}
                />
              </FormGroup>
            </div>
          )}
          {(!isProductmode) && (
            <div className='child'>
              <FormGroup>
                <FormItemLabel>Licensor Brand</FormItemLabel>
                <Dropdown
                  id={'LicensorBrand'}
                  value={LicensorBrand}
                  options={[]}
                  onClick={(value: any) => setLicensorBrand(value)}
                  placeholder={'Select a Licensor Brand'}
                />
              </FormGroup>
            </div>
          )}
          {(!isProductmode) && (
            <div className='child'>
              <FormGroup>
                <FormItemLabel>Product Tags</FormItemLabel>
                <Dropdown
                  id={'ProductTags'}
                  value={ProductTags}
                  options={[]}
                  onClick={(value: any) => setProductTags(value)}
                  placeholder={'Search for Product Tags'}
                />
              </FormGroup>
            </div>
          )}
          {(!isProductmode) && (
            <div className='child checkboxalignment'>
              <FormGroup >
                <div>
                  <FormItemLabel>National</FormItemLabel>
                  <CheckboxInput customClass='checkboxdesign'
                    id={'checkbox'}
                    checked={isNationalChecked}
                    label={''}
                    onChange={(event: any) => setIsNational(event.target.checked)}
                  />
                </div>
              </FormGroup>
              <FormGroup>
                <FormItemLabel>Rank</FormItemLabel>
                <CheckboxInput
                  customClass='checkboxdesign'
                  id={'Rank'}
                  checked={Rank}
                  label={''}
                  //value={Rank}
                  onChange={(event: any) => setRank(event.target.checked)}
                />
              </FormGroup>
            </div>
          )}

          <div className={`${isProductmode ? 'childprd' : 'child'}`}>
            <FormGroup >
              <FormItemLabel>{`${isProductmode ? 'New Product Listing : ' : 'Product Preview'}`}</FormItemLabel>
              {(!isProductmode) && (
                <TextInput
                  id={'ProductPreview'}
                  type={inputType.text}
                  name={'ProductPreview'}
                  value={''}
                  maxLength={150}
                  disabled={true}
                />
              )}
              {(isProductmode) && (
                <div>{'< Product Name > : < Product Type > : < Product Descriptor >'} </div>
              )}
              {(isProductmode) && (
                <div className='checkboxalignmentpr'>
                  <CheckboxInput
                    id={'checkbox'}
                    checked={true}
                    label={''}
                    value={true}
                  />
                </div>
              )}
            </FormGroup>
          </div>
        </div>
        <div className={`${isProductmode ? '' : 'right'}`}>

          {(!isProductmode) && (
            <div className='child'>
              <FormGroup>
                <FormItemLabel isMandatory>Status</FormItemLabel>
                <Dropdown
                  id={'Status'}
                  value={Status}
                  options={[]}
                  onClick={(value: any) => setStatus(value)}
                  placeholder={'Select a Status'}
                />
              </FormGroup>
            </div>
          )}
          {(!isProductmode) && (
            <div className='child'>
              <FormGroup>
                <FormItemLabel>Referred to</FormItemLabel>
                <Dropdown
                  id={'Referredto'}
                  value={Referredto}
                  options={[]}
                  onClick={(value: any) => setReferredto(value)}
                  placeholder={'Select a Referred Product'}
                />
              </FormGroup>
            </div>
          )}
          {(!isProductmode) && (
            <div className='child'>
              <FormGroup >
                <FormItemLabel>Markets</FormItemLabel>
                <Dropdown
                  id={'Markets'}
                  value={Markets}
                  options={[]}
                  onClick={(value: any) => setMarkets(value)}
                  placeholder={'Search for Markets'}
                  disabled={isNationalChecked}
                />
              </FormGroup>
            </div>
          )}
          {(isEditmode) && (!isProductmode) && (
            <div className='child'>
              <FormGroup>
                <FormItemLabel>
                  Recent Creatives
                </FormItemLabel>
                <TextInput
                  id={'RecentCreatives'}
                  type={inputType.text}
                  name={'RecentCreatives'}
                  value={''}
                  maxLength={150}
                />
              </FormGroup>
            </div>
          )}
          {(isEditmode) && (!isProductmode) && (
            <div className='child'>
              <FormGroup>
                <FormItemLabel>
                  Activity
                </FormItemLabel>
                <TextInput
                  id={'Activity'}
                  type={inputType.text}
                  name={'Activity'}
                  value={''}
                  maxLength={150}
                />
              </FormGroup>
            </div>
          )}
          {(isEditmode) && (!isProductmode) && (
            <div className='userAndDateFields'>
              <div className='child'>
                <FormGroup>
                  <FormItemLabel>
                    Create User
                  </FormItemLabel>
                  <TextInput
                    id={'CreateUser'}
                    type={inputType.text}
                    name={'CreateUser'}
                    value={''}
                    maxLength={150}
                    disabled={true}
                  />
                </FormGroup>
              </div>
              <div className='child'>
                <FormGroup>
                  <FormItemLabel> Create Date </FormItemLabel>
                  <TextInput
                    id={'CreateDate'}
                    type={inputType.text}
                    name={'CreateDate'}
                    value={''}
                    maxLength={150}
                    disabled={true}
                  />
                </FormGroup>
              </div>
              <div className='child'>
                <FormGroup>
                  <FormItemLabel> Change User </FormItemLabel>
                  <TextInput
                    id={'ChangeUser'}
                    type={inputType.text}
                    name={'ChangeUser'}
                    value={''}
                    maxLength={150}
                    disabled={true}
                  />
                </FormGroup>
              </div>
              <div className='child'>
                <FormGroup>
                  <FormItemLabel> Change Date </FormItemLabel>
                  <TextInput
                    id={'ChangeDate'}
                    type={inputType.text}
                    name={'ChangeDate'}
                    value={''}
                    maxLength={150}
                    disabled={true}
                  />
                </FormGroup>
              </div>
            </div>
          )}
          {(isEditmode) && (!isProductmode) && (
            <div className='child'>
              <FormGroup >
                <FormItemLabel>Previous Comments</FormItemLabel>
                <TextArea
                  id={'PreviousComments'}
                  name={'PreviousComments'}
                  rows={7}
                  columns={250}
                  disabled={true}
                />
              </FormGroup>
            </div>
          )}
          <div>
          <div className='child'>
            <FormGroup>
              <FormItemLabel>{`${isEditmode ? 'New Comment' : 'Comment'}`}</FormItemLabel>
              <TextArea
                id={'NewComment'}
                name={'NewComment'}
                rows={4}
                columns={250}
              />
            </FormGroup>
          </div>
          </div>
        
        </div>
      </div>
    </>
  );
};
