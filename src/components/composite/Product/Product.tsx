import React, {  useState } from 'react';
import './Prdouct.scss';
import { FormGroup, FormItemLabel, Dropdown, TextArea, CheckboxInput, TextInput, inputType } from '../../core';
import { DynamicSearch } from '../../core/DynamicRenderer/DynamicSearch/DynamicSearch';
import { getDropdownCompatibleData } from '../../utility/CommonMethods';
import { DynamicMultiSelectSearch } from '../../core/DynamicRenderer/DynamicMultiSelectSearch/DynamicMultiselectSearch';
export interface IProductProps {
  isEditmode: boolean;
  isProductmode: boolean;
  dropdownData:any;
  onchange:any;
}

export const Product = (props: IProductProps) => {
  const { isEditmode, isProductmode,dropdownData} = props;
  const [Brand, setBrand] = useState();
  const [LicenseeBrand, setLicenseeBrand] = useState();
  const [LicensorBrand, setLicensorBrand] = useState();
  const [Rank, setRank] = useState(true);
  const [ProductTags, setProductTags] = useState();
  const [Status, setStatus] = useState();
  const [Referredto, setReferredto] = useState();
  const [Markets, setMarkets] = useState();
  const [isNationalChecked, setIsNational] = useState(true);
  const [formData, setFormData] = useState({
    classId:'',
    productTypeId:'',
    descriptorsTypeList: [],
    descriptorsList: [],
    productnameId:'',
    brandId:'',
    newComment: '',
    createUser: '',
    createDate: '',
    changeUser: '',
    changeDate: '',
    previousComments: '',
  });
  const handleOnChangeMultiSearchDes = (value: any) => {
    value['name']='descriptor';
    props.onchange(value);
  }
   const handleOnChangeMultiSearchDestype = (value: any) => {
     value['name']='descriptorsType';
     props.onchange(value);

   }
 
   const handleOnChange = (value: string) => {
     props.onchange(value);
  
   }
   const ondescriptorsTypeClick = (values: any) => {
    setFormData({
      ...formData,
      descriptorsTypeList: values
    });
  }
    const ondescriptorsClick = (values: any) => {
      setFormData({
        ...formData,
        descriptorsList: values
      });
  }
  
  return (
    <>
      <div className={`${isProductmode ? 'container' : 'content'}`}>
        <div className={`${isProductmode ? 'pleft' : 'left'}`}>
          <div className={`${isProductmode ? 'childprd' : 'child'}`} >
            <FormGroup>
              <FormItemLabel isMandatory>Class Name</FormItemLabel>
              <DynamicSearch
                id={'classId'}
                name={'classCode'}
                fieldName={'classCode'}
                value={formData.classId}
                setValue={selectedOption =>
                  setFormData({
                    ...formData,
                    classId: selectedOption.value
                  })
                }
                 getMultiselectSearchResults={handleOnChange}
                 commonData={
                  dropdownData?.classNameDropdownList
                    ? {
                        entities: getDropdownCompatibleData(
                          dropdownData.classNameDropdownList,
                          {
                            label: 'classCode',
                            value: 'classId'
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
              <DynamicSearch
                id={'productTypeId'}
                name={'producttypeName'}
                fieldName={'producttypeName'}
                value={formData.productTypeId}
                setValue={selectedOption =>
                  setFormData({
                    ...formData,
                    productTypeId: selectedOption.value
                  })
                }
                 getMultiselectSearchResults={handleOnChange}
                 commonData={
                  dropdownData?.referredToProductTypeDropdownList
                    ? {
                        entities: getDropdownCompatibleData(
                          dropdownData.referredToProductTypeDropdownList,
                          {
                            label: 'producttypeName',
                            value: 'producttypeId'
                          }
                        )
                      }
                    : { entities: [] }
                }
                disabled={false}
              />
            </FormGroup>
          </div>
          <div className={`${isProductmode ? 'childprd' : 'child'}`} >
            <FormGroup>
              <FormItemLabel>Descriptor Type(s)</FormItemLabel>
              <DynamicMultiSelectSearch
                id={`descriptortypeList`}
                value={formData.descriptorsTypeList}
                setValue={options => ondescriptorsTypeClick(options?.mcssValues)}
                commonData={
                  dropdownData?.referredToDescriptorTypeDropdownList
                    ? {
                        entities: getDropdownCompatibleData(
                          dropdownData?.referredToDescriptorTypeDropdownList,
                          {
                            label: 'descriptortypeName',
                            value: 'descriptortypeId'
                          }
                        )
                      }
                    : { entities: [] }
                }
                getMultiselectSearchResults={(value: { search_text: any; }) =>
                 handleOnChangeMultiSearchDestype({ searchValue: value.search_text })
                }
              />
             
            </FormGroup>
          </div>
          <div className={`${isProductmode ? 'childprd' : 'child'}`} >
            <FormGroup>
              <FormItemLabel>Descriptor(s)</FormItemLabel>
<DynamicMultiSelectSearch
                id={`descriptorList`}
                value={formData.descriptorsList}
                setValue={options => ondescriptorsClick(options?.mcssValues)}
                commonData={
                  dropdownData?.referredToDescriptorDropdownList
                    ? {
                        entities: getDropdownCompatibleData(
                          dropdownData?.referredToDescriptorDropdownList,
                          {
                            label: 'descriptorName',
                            value: 'descriptorId'
                          }
                        )
                      }
                    : { entities: [] }
                }
                getMultiselectSearchResults={(value: { search_text: any; }) =>
                 handleOnChangeMultiSearchDes({ searchValue: value.search_text })
                }
              />

            </FormGroup>
          </div>
          <div className={`${isProductmode ? 'childprd' : 'child'}`} >
            <FormGroup>
              <FormItemLabel isMandatory>Product Name</FormItemLabel>
              <DynamicSearch
                id={'productnameId'}
                name={'productName'}
                fieldName={'productName'}
                value={formData.productnameId}
                setValue={selectedOption =>
                  setFormData({
                    ...formData,
                    productnameId: selectedOption.value
                  })
                }
                 getMultiselectSearchResults={handleOnChange}
                 commonData={
                  dropdownData?.referredToProductNameDropdownList
                    ? {
                        entities: getDropdownCompatibleData(
                          dropdownData.referredToProductNameDropdownList,
                          {
                            label: 'productName',
                            value: 'productnameId'
                          }
                        )
                      }
                    : { entities: [] }
                }
                disabled={false}
              />
            </FormGroup>
          </div>
          <div className={`${isProductmode ? 'childprd' : 'child'}`}>
            <FormGroup>
              <FormItemLabel isMandatory>Brand</FormItemLabel>  
              <Dropdown
                id={'brand'}
                options={
                  props.dropdownData?.statusList
                    ? getDropdownCompatibleData(props.dropdownData?.statusList, {
                        label: 'CompanyName',
                        value: 'CompanyId'
                      })
                    : []
                }
                onClick={(value: any) =>
                  setFormData({
                    ...formData,
                    brandId: value
                  })
                }
                value={formData.brandId}
                placeholder={'Select a Brand'}
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
