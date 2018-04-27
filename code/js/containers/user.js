import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {edit, deleteUser, addUser, submit} from '../actions/index';

class User extends Component {

    constructor(props) {
      super(props)
      this.state = {
        editMode: this.props.editMode,
      };
      this.user = this.props.children

      this._editButtonClick = this._editButtonClick.bind(this)
      this._setUser = this._setUser.bind(this)
    }

    _editButtonClick(){
      this.setState({
      editMode: true,
    });
    }

  render(){
    if (!this.state.editMode) {
      return this.rendNormMode(this.user);
    }
    return this.rendEditMode(this.user);
  }

    rendNormMode(user){
      return(
        <tr>
          <td>{user.id}</td>
          <td>{user.age}</td>
          <td>{user.name}</td>
          <td>{user.gender}</td>
          <td>{user.company}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.address}</td>
          <td>
            <button className='button_edit' onClick={this._editButtonClick}>Edit</button>
            <button className='button_delete' onClick={() => this.props.deleteUser (user.id)}>Delete</button>
          </td>
        </tr>
      );
    }

    rendEditMode(user){
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td><input type="text" ref="age" defaultValue={user.age}/></td>
          <td><input type="text" ref="name" defaultValue={user.name}/></td>
          <td><input type="text" ref="gender" defaultValue={user.gender}/></td>
          <td><input type="text" ref="company" defaultValue={user.company}/></td>
          <td><input type="text" ref="email" defaultValue={user.email}/></td>
          <td><input type="text" ref="phone" defaultValue={user.phone}/></td>
          <td><textarea ref="address" defaultValue={user.address}/></td>
          <td>
            <button className='button_save' onClick={this._setUser}>Save</button>
            <button className='button_delete' onClick={() => this.props.deleteUser (user.id)}>Delete</button>
          </td>
        </tr>
      );
    }

    _setUser(){
        this.user.age = parseInt(this.refs.age.value);
        this.user.name = this.refs.name.value;
        this.user.gender = this.refs.gender.value;
        this.user.company = this.refs.company.value;
        this.user.email = this.refs.email.value;
        this.user.phone = this.refs.phone.value;
        this.user.address = this.refs.address.value;

        this.props.edit(this.user);

        this.setState({
        editMode: false,
      });
    }

}

function mapStateToProps(state) {
  return {
    users: state.active,
  };
}


  function matchDispatchToProps(dispatch){
    return bindActionCreators({edit: edit, deleteUser: deleteUser, addUser: addUser, submit: submit}, dispatch)
  }

export default connect(mapStateToProps, matchDispatchToProps)(User);
