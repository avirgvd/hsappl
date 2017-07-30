/**
 * Created by govind on 7/23/16.
 */

const FileUpload = require('react-fileupload');
var React = require('react');
import {filesServerBaseURL} from '../../Api';

var HSFileUpload = React.createClass({

  getDefaultProps: function () {
    return {
      text: 'Welcome home from props!'
    }
  },

  getInitialState: function () {

    console.log("HSFileUpload getInitialState: ", this.props.caption);
    console.log("HSFileUpload getInitialState: ", this.props.tag);

    var baseUrl = filesServerBaseURL() + 'upload';



    return {
      options: {
        baseUrl: baseUrl,
        param:{
          fid:0,
        },
        chooseAndUpload: true,
        fileFieldName : 'file',
        paramAddToField : {tag: this.props.tag},
        beforeUpload: this._beforeUpload,
        multiple:true
      }
    }
  },

  _beforeUpload: function(files, mill) {
    return true;

    //console.log(mill);
    //console.log(files);
    //console.log(files[0]);
    //console.log(typeof files);
    //if(typeof files === string) {
    //  console.log("returning true1");
    //  return true;
    //}
    //if(files[0].size<1024*1024*20){
    //  files[0].mill = mill;
    //  console.log("returning true");
    //  return true;
    //}
    //console.log("returning false");
    //return false;
  },

  /*
   * This function will be called right after the component mounting on DOM
   * and before render()
   * */
  componentWillMount: function () {

  },

  /*
   * This function will be called after render()
   * It is good idea to perform any async operations here as render can show some default
   * content first and this function can asyncronously trigger render() when there is data
   * */
  componentDidMount: function () {

  },


  componentWillUnmount: function () {

  },

  render: function () {

    console.log("HSFileUpload render: ", this.props.caption);

    return (
      <FileUpload options={this.state.options}>
        <div className="large ui icon button" ref="chooseAndUpload"><i className="upload icon"></i>{this.props.caption}</div>
      </FileUpload>
    );
    //return (
    //  <FileUploadProgress key='ex1' url='http://localhost:3000/api/upload'
    //                      onProgress={(e, request, progress) => {console.log('progress', e, request, progress);}}
    //                      onLoad={ (e, request) => {console.log('load', e, request);}}
    //                      onError={ (e, request) => {console.log('error', e, request);}}
    //                      onAbort={ (e, request) => {console.log('abort', e, request);}}
    //  />
    //);
  }
});

module.exports = HSFileUpload;