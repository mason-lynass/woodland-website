import React, { useEffect } from 'react';
import '../CSS/Newsletter.css';

function Newsletter() {
    useEffect(() => {
        const mailerLiteScript = document.createElement('script');
        mailerLiteScript.src =
            'https://groot.mailerlite.com/js/w/webforms.min.js?v2d8fb22bb5b3677f161552cd9e774127';
        mailerLiteScript.async = true;
        document.body.appendChild(mailerLiteScript);

        window.ml_webform_success_19009901 = function () {
            const successContent = document.querySelector(
                '.ml-form-successBody'
            );
            const formContent = document.querySelector('.ml-form-embedBody');

            if (successContent && formContent) {
                successContent.style.display = 'block';
                formContent.style.display = 'none';
            }
        };

        return () => {
            document.body.removeChild(mailerLiteScript);
        };
    }, []);

    return (
        <main id='newsletter-page'>
            <style>{`
    .ml-form-embedSubmitLoad {
      display: inline-block;
      width: 20px;
      height: 20px;
    }

    .g-recaptcha {
    transform: scale(1);
    -webkit-transform: scale(1);
    transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
    height: ;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0,0,0,0);
      border: 0;
    }

    .ml-form-embedSubmitLoad:after {
      content: " ";
      display: block;
      width: 11px;
      height: 11px;
      margin: 1px;
      border-radius: 50%;
      border: 4px solid #fff;
    border-color: #ffffff #ffffff #ffffff transparent;
    animation: ml-form-embedSubmitLoad 1.2s linear infinite;
    }
    @keyframes ml-form-embedSubmitLoad {
      0% {
      transform: rotate(0deg);
      }
      100% {
      transform: rotate(360deg);
      }
    }
      #mlb2-19009901.ml-form-embedContainer {
        box-sizing: border-box;
        display: table;
        margin: 0 auto;
        position: static;
        width: 100% !important;
      }
      #mlb2-19009901.ml-form-embedContainer h4,
      #mlb2-19009901.ml-form-embedContainer p,
      #mlb2-19009901.ml-form-embedContainer span,
      #mlb2-19009901.ml-form-embedContainer button {
        text-transform: none !important;
        letter-spacing: normal !important;
      }
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper {
        background-color: #fff;
        border-width: 0px;
        border-color: transparent;
        border-radius: 4px;
        border-style: solid;
        box-sizing: border-box;
        display: inline-block !important;
        margin: 0;
        padding: 0;
        position: relative;
      }
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper.embedPopup,
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper.embedDefault { width: 550px; }
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper.embedForm { max-width: 550px; width: 100%; }
      #mlb2-19009901.ml-form-embedContainer .ml-form-align-left { text-align: left; }
      #mlb2-19009901.ml-form-embedContainer .ml-form-align-center { text-align: center; }
      #mlb2-19009901.ml-form-embedContainer .ml-form-align-default { display: table-cell !important; vertical-align: middle !important; text-align: center !important; }
      #mlb2-19009901.ml-form-embedContainer .ml-form-align-right { text-align: right; }
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedHeader img {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        height: auto;
        margin: 0 auto !important;
        max-width: 100%;
        width: undefinedpx;
      }
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody,
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody {
        padding: 20px 20px 0 20px;
      }
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody.ml-form-embedBodyHorizontal {
        padding-bottom: 0;
      }
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent,
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent {
        text-align: left;
        margin: 0 0 20px 0;
      }
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent h4,
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent h4 {
        color: #000000;
        font-family: 'Open Sans', Arial, Helvetica, sans-serif;
        font-size: 28px;
        font-weight: 400;
        margin: 0 0 10px 0;
        text-align: center;
        word-break: break-word;
      }
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent p,
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent p {
        color: #000000;
        font-family: 'Open Sans', Arial, Helvetica, sans-serif;
        font-size: 15px;
        font-weight: 400;
        line-height: 21px;
        margin: 0 0 10px 0;
        text-align: center;
      }
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent p a,
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent p a {
        color: #000000;
        text-decoration: underline;
      }
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-block-form .ml-field-group {
        text-align: left!important;
      }
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent p:last-child,
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent p:last-child {
        margin: 0;
      }
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody form {
        margin: 0;
        width: 100%;
      }
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-formContent,
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow {
        margin: 0 0 20px 0;
        width: 100%;
      }
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-formContent.horozintalForm {
        margin: 0;
        padding: 0 0 20px 0;
        width: 100%;
        height: auto;
        float: left;
      }
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow {
        margin: 0 0 10px 0;
        width: 100%;
      }
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow.ml-last-item {
        margin: 0;
      }
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input {
        background-color: #ffffff !important;
        color: #333333 !important;
        border-color: #cccccc;
        border-radius: 4px !important;
        border-style: solid !important;
        border-width: 1px !important;
        font-family: 'Open Sans', Arial, Helvetica, sans-serif;
        font-size: 14px !important;
        height: auto;
        line-height: 21px !important;
        margin-bottom: 0;
        margin-top: 0;
        margin-left: 0;
        margin-right: 0;
        padding: 10px 10px !important;
        width: 100% !important;
        box-sizing: border-box !important;
        max-width: 100% !important;
      }
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow {
        height: auto;
        width: 100%;
        float: left;
      }
      .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-input-horizontal { width: 70%; float: left; }
      .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-button-horizontal { width: 30%; float: left; }
      .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-button-horizontal.labelsOn { padding-top: 25px;  }
      .ml-form-formContent.horozintalForm .ml-form-horizontalRow .horizontal-fields { box-sizing: border-box; float: left; padding-right: 10px;  }
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow input {
        background-color: #ffffff;
        color: #333333;
        border-color: #cccccc;
        border-radius: 4px;
        border-style: solid;
        border-width: 1px;
        font-family: 'Open Sans', Arial, Helvetica, sans-serif;
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 0;
        margin-top: 0;
        padding: 10px 10px;
        width: 100%;
        box-sizing: border-box;
        overflow-y: initial;
      }
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow button {
        background-color: #478c8e !important;
        border-color: #478c8e;
        border-style: solid;
        border-width: 1px;
        border-radius: 25px;
        box-shadow: none;
        color: #ffffff !important;
        cursor: pointer;
        font-family: 'Open Sans', Arial, Helvetica, sans-serif;
        font-size: 19px !important;
        font-weight: 400;
        line-height: 20px;
        margin: 0 !important;
        padding: 10px !important;
        width: 100%;
        height: auto;
      }
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow button:hover {
        background-color: #74bec1 !important;
        border-color: #74bec1 !important;
      }
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit {
        margin: 0 0 20px 0;
        float: left;
        width: 100%;
      }
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button {
        background-color: #478c8e !important;
        border: none !important;
        border-radius: 25px !important;
        box-shadow: none !important;
        color: #ffffff !important;
        cursor: pointer;
        font-family: 'Open Sans', Arial, Helvetica, sans-serif !important;
        font-size: 19px !important;
        font-weight: 400 !important;
        line-height: 21px !important;
        height: auto;
        padding: 10px !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button.loading {
        display: none;
      }
      #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button:hover {
        background-color: #74bec1 !important;
      }
      .ml-error input, .ml-error textarea, .ml-error select {
        border-color: red!important;
      }
      @media only screen and (max-width: 550px){
        .ml-form-embedWrapper.embedDefault, .ml-form-embedWrapper.embedPopup { width: 100%!important; }
        .ml-form-formContent.horozintalForm { float: left!important; }
        .ml-form-formContent.horozintalForm .ml-form-horizontalRow { height: auto!important; width: 100%!important; float: left!important; }
        .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-input-horizontal { width: 100%!important; }
        .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-input-horizontal > div { padding-right: 0px!important; padding-bottom: 10px; }
        .ml-form-formContent.horozintalForm .ml-button-horizontal { width: 100%!important; }
        .ml-form-formContent.horozintalForm .ml-button-horizontal.labelsOn { padding-top: 0px!important; }
      }
    `}</style>

            <style type='text/css'>{`
      .ml-mobileButton-horizontal { display: none; }
      #mlb2-19009901 .ml-mobileButton-horizontal button {
        background-color: #478c8e !important;
        border-color: #478c8e !important;
        border-style: solid !important;
        border-width: 1px !important;
        border-radius: 25px !important;
        box-shadow: none !important;
        color: #ffffff !important;
        cursor: pointer;
        font-family: 'Open Sans', Arial, Helvetica, sans-serif !important;
        font-size: 14px !important;
        font-weight: 400 !important;
        line-height: 20px !important;
        padding: 10px !important;
        width: 100% !important;
      }
      @media only screen and (max-width: 550px) {
        #mlb2-19009901.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-formContent.horozintalForm {
          padding: 0 0 10px 0 !important;
        }
        .ml-hide-horizontal { display: none !important; }
        .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-input-horizontal > div { padding-bottom: 16px !important; }
      }
    `}</style>

            <div id='mailing-list'>
                <div
                    id='mlb2-19009901'
                    className='ml-form-embedContainer ml-subscribe-form ml-subscribe-form-19009901'
                >
                    <div className='ml-form-align-center'>
                        <div className='ml-form-embedWrapper embedForm'>
                            <div className='ml-form-embedBody ml-form-embedBodyHorizontal row-form'>
                                <div className='ml-form-embedContent'>
                                    <h4>Stay Connected</h4>
                                    <p>
                                        Sign up for our mailing list to hear
                                        about events, open spaces, and news.
                                    </p>
                                    <p>
                                        (To request a show at Woodland, please
                                        fill out{' '}
                                        <a href='https://forms.gle/H7XQjmM7R5fVCxez6'>
                                            this form
                                        </a>
                                        )
                                    </p>
                                </div>
                                <form
                                    className='ml-block-form'
                                    action='https://assets.mailerlite.com/jsonp/1144643/forms/135472700269266043/subscribe'
                                    method='post'
                                    target='_blank'
                                >
                                    <div className='ml-form-formContent horozintalForm'>
                                        <div className='ml-form-horizontalRow'>
                                            <div className='ml-input-horizontal'>
                                                <div
                                                    style={{ width: '100%' }}
                                                    className='horizontal-fields'
                                                >
                                                    <div className='ml-field-group ml-field-email ml-validate-email ml-validate-required'>
                                                        <input
                                                            type='email'
                                                            className='form-control'
                                                            name='fields[email]'
                                                            placeholder='Email address'
                                                            autoComplete='email'
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='ml-button-horizontal primary'>
                                                <button
                                                    type='submit'
                                                    className='primary'
                                                >
                                                    SUBMIT
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <input
                                        type='hidden'
                                        name='ml-submit'
                                        value='1'
                                    />
                                </form>
                            </div>

                            <div
                                className='ml-form-successBody row-success'
                                style={{ display: 'none' }}
                            >
                                <div className='ml-form-successContent'>
                                    <h4>Thank you!</h4>
                                    <p>
                                        You have successfully joined our
                                        subscriber list.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Newsletter;
