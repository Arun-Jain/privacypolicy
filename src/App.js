import './App.css';
import React from 'react';

import { Container, Row, Col } from "react-bootstrap";
import Form1 from '../src/components/Form1/form1'

import logo from '../src/logo.svg';

import axios from 'axios';
import jsPDF from "jspdf";
// import { jsPDF } from "jspdf";
// import ReactDOMServer from "react-dom/server";


class App extends React.Component { 

  constructor(props) {
    super(props);

    this.selectTypeweb = this.selectTypeweb.bind(this);
    this.selectTypeapp = this.selectTypeapp.bind(this);
    this.changeForm = this.changeForm.bind(this);
    this.prevForm = this.prevForm.bind(this);
    this.generatePolicy = this.generatePolicy.bind(this);
    this.downloadPdf = this.downloadPdf.bind(this);

    this.state = {
      pdf_data: "",
      step: 1,
      heading1: "Step 1. Let's select the platforms where your Privacy Policy will be used on.",
      heading2: "Step 2. Let's continue with your website and/or app information.",
      heading3: "Step 3. Let's continue building your Privacy Policy.",
      form: {
        step1:{
          typeweb: false,
          typeapp: false,
        },
        step2: {
          weburl: "",
          webname: "",
          appname: "",
          entitytype: "",
          country: "",
        },
        step3: {
          personalInformation: "",
          additionalInformation: "",
          googleAnalytics: "",
          sendEmails: "",
          ads: "",
          payProductorServices: "",
          marketing: "",
          ccpa: "",
          contactType: "",
          email: "",
        },
        step4: {
          language: ""
        }
      }
      };
  }

  prevForm() {
    this.setState({
      step: this.state.step - 1,
    });
  }

  selectTypeweb() {
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        step1: {
          ...prevState.form.step1,
          typeweb: !this.state.form.step1.typeweb
        }
      }
    })
    );
  }

  selectTypeapp() {
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        step1: {
          ...prevState.form.step1,
          typeapp: !this.state.form.step1.typeapp
        }
      }
    })
    );
  }

  changeForm(e) {
    e.preventDefault();
    console.log(this.state.form)
    this.setState({
      step: this.state.step + 1,
    });
  }

  generatePolicy(e) {
    e.preventDefault();
    console.log("Privacy policy generated")
    var formData = new FormData()
    formData.append("email", this.state.form.step3.email)
    formData.append("contact", this.state.form.step3.email)
    formData.append("url", this.state.form.step2.weburl)
    formData.append("name", this.state.form.step2.webname)
    formData.append("app", this.state.form.step2.appname)
    formData.append("analytics", this.state.form.step3.googleAnalytics)
    formData.append("ads", this.state.form.step3.ads)
    formData.append("marketing", this.state.form.step3.marketing)

    axios.post('https://arunjain.pythonanywhere.com/privacy', formData)
      .then(response => {
        console.log(response);
        this.setState({
          pdf_data: response.data.pdf_data,
          step: this.state.step + 1,
        })
      })
      .catch(error => {
        console.log(error);
      })
    }

downloadPdf() {
  const pdf = new jsPDF()
  pdf.fromHTML(this.state.pdf_data, 20, 20, {width: 150})
  pdf.save()
}

  renderstepOne() {
    const { form } = this.state;
    return (
      <React.Fragment><div className="globalForm1">
        <label className="title">Where will your Privacy Policy be used?</label>
        <div className="titlelabel">Click all that apply</div>
        <div onClick={() => this.selectTypeweb()} className={form.step1.typeweb===false ? "typeweb" :"typeweb_selected"}><span>WEBSITE <br />Privacy Policy for a Website</span></div>
        <div onClick={() => this.selectTypeapp()} className={form.step1.typeapp===false ? "typeapp":"typeapp_selected"}><span>APP <br />Privacy Policy for an App</span></div>
      </div>
        <button
          disabled={this.state.form.step1.typeweb===false && this.state.form.step1.typeapp===false ? true : false} 
          className={this.state.form.step1.typeweb===true || this.state.form.step1.typeapp===true? "buttonen":"buttondis"}
          onClick={(e) => this.changeForm(e)}
          >Next Step
        </button>
      </React.Fragment>
      )
  }

  setInputValue(e, step) {
    const value = e.target.value
    const name=e.target.name
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [step]: {
          ...prevState.form[step],
          [name]: value
        }
      }
    })
    );
  }

  renderstepTwo() {
    return(
        <React.Fragment>
          <form onSubmit={(e) => this.changeForm(e)}>

          {this.state.form.step1.typeweb ?
            <div className="inputDiv"><div className="inputdesc">What is your website URL?
            </div>

            <input 
              placeholder="https://wwww.mysite.com"
              className="formInput"
              type="text" required
              name="weburl"
              value={this.state.form.step2.weburl} 
              onChange={(e)=>this.setInputValue(e, "step2")}/>

            <div className="inputDiv">  
            <div className="inputdesc"> What is your website name?
            </div>

            <input 
            placeholder="My Site"
            className="formInput"
            type="text" required
            name="webname" 
            value={this.state.form.step2.webname} 
            onChange={(e)=>this.setInputValue(e, "step2")}/></div></div>
            :
            <div></div>}

            {this.state.form.step1.typeapp?
              <div className="inputDiv">
            <div className="inputdesc">What is your app name?
            </div>

            <input
            placeholder="My App" 
            className="formInput"
            type="text" required
            name="appname" 
            value={this.state.form.step2.appname} 
            onChange={(e)=>this.setInputValue(e, "step2")}/>
            </div>:<div></div>}

            <div className="radioDiv">
            <div className="inputdesc">Entity type</div>
            <div>

              <div className="radioText">
              <input 
              id="businessradio"
              className="inputRadio"
              type="radio" value="business" name="entitytype" required
              onChange={(e)=>this.setInputValue(e, "step2")}
              checked={this.state.form.step2.entitytype==="business"} /><label for="businessradio"> I'm a Business</label>
              </div>
              
              <div>
              <input
              id="individualradio"
              className="inputRadio"
              type="radio" value="individual" name="entitytype"
              onChange={(e)=>this.setInputValue(e, "step2")}
              checked={this.state.form.step2.entitytype==="individual"} /><label for="individualradio"> I'm an Individual</label>
              </div>
              </div>

            </div>

            <div className="countryDiv">
            <div className="inputdesc">Enter the country</div>
            <select>
              <option value="india">India</option>
              <option value="china">China</option>
              <option value="brazil">Brazil</option>
              <option value="us">United States</option>
            </select>
            </div>
            <button className="btnRight" type="submit">Next Step</button>
          </form>
          <div className="formonePrev" onClick={(e) => this.prevForm(e)}>Previous</div>
        </React.Fragment>
      )
  }

  renderstepThree() {
    return (
        <React.Fragment>
          <form onSubmit={(e) => this.generatePolicy(e)}>
          <div className="form3">
            <div className="form3title">Do you use tracking and/or analytics tools, such as Google Analytics?</div>
            <div>
            <input id="ganalyticsyes" type="radio" 
              name="googleAnalytics" value="true" required
              onChange={(e)=>this.setInputValue(e, "step3")}
              checked={this.state.form.step3.googleAnalytics==="true"}/> <label for="ganalyticsyes">Yes, we use Google Analytics or other related tools</label>
            </div>
            <div>
            <input id="ganalyticsno" type="radio" name="googleAnalytics" value="false" 
            onChange={(e)=>this.setInputValue(e, "step3")}
            checked={this.state.form.step3.googleAnalytics==="false"}/><label for="ganalyticsno"> No</label>
            </div>
          </div>


          <div className="form3">
            <div className="form3title">Do you show ads?
            </div>
            <div>
            <input id="adsyes" className="inputRadio" type="radio" name="ads" value="true" required
            onChange={(e)=>this.setInputValue(e, "step3")}
            checked={this.state.form.step3.ads==="true"}
            /><label for="adsyes">Yes, we show ads</label>
            </div>
            <div>
            <input id="adsno" className="inputRadio" type="radio" name="ads" value="false"
            checked={this.state.form.step3.ads==="false"}
            onChange={(e)=>this.setInputValue(e, "step3")}/><label for="adsno">No</label>
            </div>
            </div>

            <div className="form3">
            <div className="form3title">Do you use remarketing services for marketing & advertising purposes?
            </div>
            <div>
            <input id="marketingyes" className="inputRadio" type="radio" name="marketing" required value="true"
            onChange={(e)=>this.setInputValue(e, "step3")}
            checked={this.state.form.step3.marketing==="true"}
            /><label for="marketingyes">Yes, we use remarketing services to advertise our business</label>
            </div>
            <div>
            <input id="marketingno" className="inputRadio" type="radio" name="marketing" value="false"
            checked={this.state.form.step3.marketing==="false"}
            onChange={(e)=>this.setInputValue(e, "step3")}/><label for="marketingno"> No</label>
            </div>
            </div>

            <div className="form3">
            <div className="form3title">How can users contact you for any questions regarding your Privacy Policy?</div>
            <input 
            className="formInput"
            type="email" name="email" required 
            value={this.state.form.step3.email} 
            onChange={(e)=>this.setInputValue(e, "step3")}/>
            </div>
            <button className="btnRight" type="submit">Generate</button>
          </form>
          <div className="formonePrev" onClick={(e) => this.prevForm(e)}>Previous</div>
        </React.Fragment>
      )
  }

  renderstepFour() {
    console.log(this.state.pdf_data)
    return(
        <React.Fragment>
          <div dangerouslySetInnerHTML={{ __html: this.state.pdf_data }} />
          <div className="downloadBtn" onClick={() => this.downloadPdf()}>Download</div>
        </React.Fragment>
      )
  }

  render() {
    // const pdf = new jsPDF("p", "mm", "a4");
    // pdf.fromHTML("<h1>Arun Jain</h1>")
    // pdf.save()
  return (
    <div className="App">
      <header className="App-header">
        <Container className="container">
          <Row>
            <Col md>
              <img src={logo} alt="Logo" />
            </Col>
          </Row>
        </Container>
      </header>
      <div className="section">
        <Container>
          <Row>
            <Col md>            
              <h3>Privacy Policy Generator</h3>
              {this.state.step===1?<p className="section-para">{this.state.heading1}</p>:this.state.step===2?<p className="section-para">{this.state.heading2}</p>:this.state.step===3?<p className="section-para">{this.state.heading3}</p>:this.state.heading1}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="forms123">
        <Container>
        <Row>
        <Col className="col-md-8">
      {this.state.step===1?
        <p>{this.renderstepOne()}</p>:
          this.state.step===2?
            <p>{this.renderstepTwo()}</p>:
              this.state.step===3?
                <p>{this.renderstepThree()}</p>:
                  this.state.step===4?
                    <p>{this.renderstepFour()}</p>:
                        <p>{this.renderstepOne()}</p>}
      </Col>
      </Row>
      </Container>
      </div>
    </div>
  )
}
}

export default App;
