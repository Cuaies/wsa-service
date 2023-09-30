import "./landing.scss";
import NavBar from "../../components/navBar/NavBar";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { isURL } from "../../validators/isURL";
import { FormValues } from "../../ts/interface/FormValues.interface";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div id="landing">
      <NavBar />
      <div className="container">
        <Formik
          initialValues={{
            url: "",
            fetchImages: false,
            fetchLinks: false,
            download: false,
          }}
          onSubmit={async (values: FormValues) => {}}
        >
          {() => (
            <Form>
              <div className="form-container">
                <label htmlFor="targetURL">Target URL</label>
                <Field
                  className="text"
                  type="text"
                  id="url"
                  name="url"
                  placeholder="https://wsa-test.vercel.app"
                  validate={isURL}
                />
                <ErrorMessage name="url" className="error" />

                <label>
                  <label htmlFor="fetchImages">Scrape Images</label>
                  <Field type="checkbox" name="fetchImages" />
                </label>

                <label>
                  <label htmlFor="fetchLinks">Scrape Links</label>
                  <Field type="checkbox" name="fetchLinks" />
                </label>

                <label>
                  <label htmlFor="download">Download</label>
                  <Field type="checkbox" name="download" />
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
