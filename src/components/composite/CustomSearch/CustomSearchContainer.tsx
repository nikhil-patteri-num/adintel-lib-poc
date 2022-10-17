import * as React from 'react';
import { Component } from 'react';
import { CustomSearch } from './CustomSearch';
// import {
//   AppState,
//   Dispatch,
//   bindActionCreators,
//   getCustomSearchColumnNames,
//   getCustomSearchColumnNamesValues,
//   Connector
// } from 'Framework';

export interface ICustomSearchContainerProps extends ILinkDispatchToProps, ILinkStatetoProps {
  onChange: (query: string) => void;
  onEnterButtonClick: () => void;
  planeQuery: string;
  onCheckBoxChecked: boolean;
}

interface ILinkStatetoProps {
  customSearchData: any;
}

interface ILinkDispatchToProps {
  getCustomSearchColumnNames: () => void;
  getCustomSearchColumnNamesValues: (payload: any) => void;
}

class CustomSearchContainer extends Component<ICustomSearchContainerProps> {
  componentDidMount(): void {
    this.props.getCustomSearchColumnNames();
  }

  render(): JSX.Element {
    return (
      <>
        <CustomSearch
          onChange={this.props.onChange}
          customSearchData={this.props.customSearchData}
          onSearch={this.props.getCustomSearchColumnNamesValues}
          onEnterButtonClick={this.props.onEnterButtonClick}
          planeQuery={this.props.planeQuery}
          onCheckBoxChecked={this.props.onCheckBoxChecked}
        />
      </>
    );
  }
}

// const mapStateToProps = (state: AppState): ILinkStatetoProps => {
//   return {
//     customSearchData: state.customSearch
//   };
// };

// const mapDispatchToProps = (dispatch: Dispatch): ILinkDispatchToProps => {
//   return {
//     getCustomSearchColumnNames: bindActionCreators(getCustomSearchColumnNames, dispatch),
//     getCustomSearchColumnNamesValues: bindActionCreators(getCustomSearchColumnNamesValues, dispatch)
//   };
// };

// export default Connector.connect(mapStateToProps, mapDispatchToProps)(CustomSearchContainer);
export default CustomSearchContainer;