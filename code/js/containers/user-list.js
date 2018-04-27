import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {edit, deleteUser, addUser, submit, sorted, filter} from '../actions/index';
import User from './user';
import styles from '../../css/style.css';

const DEFAULT_NAME_USER = "Unknown";

class UserList extends Component {

  showList(){
    return this.props.users.map ((user) =>{
      var editMode = false;
      if (user.name === DEFAULT_NAME_USER) editMode = true;
          return (<User key={user.id} editMode={editMode}>{user}</User>);
    });
  }

  render (){
    return(
      <div>
        <table>
        <tbody>
        <tr>
          <td><input type="text" ref="id" onChange={() => this.props.filter ("id", this.refs.id.value)}/></td>
          <td><input type="number" ref="age" onChange={() => this.props.filter ("age", this.refs.age.value)} /></td>
          <td><input type="text" ref="name" onChange={() => this.props.filter ("name", this.refs.name.value)} /></td>
          <td><input type="text" ref="gender" onChange={() => this.props.filter ("gender", this.refs.gender.value)} /></td>
          <td><input type="text" ref="company" onChange={() => this.props.filter ("company", this.refs.company.value)} /></td>
          <td><input type="text" ref="email" onChange={() => this.props.filter ("email", this.refs.email.value)} /></td>
          <td><input type="text" ref="phone" onChange={() => this.props.filter ("phone", this.refs.phone.value)} /></td>
          <td><input type="text" ref="address" onChange={() => this.props.filter ("address", this.refs.address.value)} /></td>
          <td>Фильтр</td>
        </tr>
          <tr>
            <th onClick={() => this.props.sorted ("id")}>id</th>
            <th onClick={() => this.props.sorted ("age")}>age</th>
            <th onClick={() => this.props.sorted ("name")}>name</th>
            <th onClick={() => this.props.sorted ("gender")}>gender</th>
            <th onClick={() => this.props.sorted ("company")}>company</th>
            <th onClick={() => this.props.sorted ("email")}>email</th>
            <th onClick={() => this.props.sorted ("phone")}>phone</th>
            <th onClick={() => this.props.sorted ("address")}>address</th>
            <th>actions</th>
           </tr>
           {this.showList ()}
          </tbody>
        </table>
        <button className='button_submit'  onClick={() => this.props.submit ()}>Submit</button>
        <button className='button_add' onClick={() => this.props.addUser ()}>Add</button>
      </div>
    );
  }

}


  function mapStateToProps(state) {
    return {
      active: state.active,
      users: state.active.users,
    };
  }

  function matchDispatchToProps(dispatch){
    return bindActionCreators({edit: edit, deleteUser: deleteUser, addUser: addUser,
      submit: submit, sorted: sorted, filter: filter}, dispatch)
  }

export default connect(mapStateToProps, matchDispatchToProps)(UserList);
