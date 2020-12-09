import React from 'react';
import styles from './form1.module.css';

class Form1 extends React.Component {

	constructor(props) {
    super(props);
    this.selectTypeweb = this.selectTypeweb.bind(this);
    this.selectTypeapp = this.selectTypeapp.bind(this);


    this.state = {
      typeweb: false,
      typeapp: false,
      };
  }

selectTypeweb() {
	this.setState({
		typeweb: !this.state.typeweb,
	});
}

selectTypeapp() {
	this.setState({
		typeapp: !this.state.typeapp,
	});
}

		render() {
			return (
				<React.Fragment><div className={styles.globalForm1}>
				<label className={styles.title}>Where will your Privacy Policy be used?</label>
				<div className={styles.subtitle}>Click all that apply</div>
				<div onClick={() => this.selectTypeweb()} className={this.state.typeweb===false ? `${styles.typeweb}`:`${styles.typeweb_selected}`}><span>WEBSITE <br />Privacy Policy for a Website</span></div>
				<div onClick={() => this.selectTypeapp()} className={this.state.typeapp===false ? `${styles.typeapp}`:`${styles.typeapp_selected}`}><span>APP <br />Privacy Policy for an App</span></div>
			</div>
			<button disabled={this.state.typeweb===false && this.state.typeapp===false ? true : false} className={this.state.typeweb===true || this.state.typeapp===true? `${styles.buttonen}`:`${styles.buttondis}`}>Next Step</button>
			</React.Fragment>)
		}
	}

export default Form1;
