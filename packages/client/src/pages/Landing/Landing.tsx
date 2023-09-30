import "./landing.scss";
import NavBar from "../../components/navBar/NavBar";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { isURL } from "../../validators/isURL";
import { FormValues } from "../../ts/interface/FormValues.interface";
import axios from "axios";

export default function Landing() {
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
          onSubmit={async (values: FormValues) => {
            try {
              const res = await axios.get(`/v1`, {
                params: values,
              });

              if (values.download) {
                const blob = new Blob([JSON.stringify(res.data)], {
                  type: "application/json",
                });
                const blobURL = URL.createObjectURL(blob);
                const downloadLink = document.createElement("a");
                downloadLink.href = blobURL;
                downloadLink.download = `scrape-${Date.now()}.json`;
                downloadLink.click();
              } else {
                const blob = new Blob([JSON.stringify(res.data)], {
                  type: "application/json",
                });
                const blobURL = URL.createObjectURL(blob);
                window.open(blobURL);
                URL.revokeObjectURL(blobURL);
              }
            } catch (err) {
              console.error(err);
            }
          }}
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
