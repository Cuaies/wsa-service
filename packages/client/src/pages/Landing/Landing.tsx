import "./landing.scss";
import NavBar from "../../components/navBar/NavBar";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { isURL } from "../../validators/isURL";

interface Values {
  targetURL: "";
  imgToggle: boolean;
  linkToggle: boolean;
  renderJS: boolean;
}

export default function Landing() {
  return (
    <div id="landing">
      <NavBar />
      <div className="container">
        <Formik
          initialValues={{
            targetURL: "",
            imgToggle: false,
            linkToggle: false,
            renderJS: false,
          }}
          onSubmit={async (values: Values) => {
            // TODO: Send request to server
          }}
        >
          {() => (
            <Form>
              <div className="form-container">
                <label htmlFor="targetURL">Target URL</label>
                <Field
                  className="text"
                  type="text"
                  id="targetURL"
                  name="targetURL"
                  placeholder="https://wsa-test.vercel.app"
                  validate={isURL}
                />
                <ErrorMessage name="targetURL" className="error" />

                <label>
                  <label htmlFor="imgToggle">Toggle Images</label>
                  <Field type="checkbox" name="imgToggle" disabled={true} />
                </label>

                <label>
                  <label htmlFor="linkToggle">Toggle Images</label>
                  <Field type="checkbox" name="linkToggle" disabled={true} />
                </label>

                <label>
                  <label htmlFor="renderJS">Render JavaScript</label>
                  <Field type="checkbox" name="renderJS" disabled={true} />
                </label>

                <button type="submit">Submit</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
