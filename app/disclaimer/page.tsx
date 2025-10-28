import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 py-12 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-8">Disclaimer</h1>

          <div className="prose prose-lg max-w-none text-foreground space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">General Disclaimer</h2>
              <p>
                The information provided on the Joshina International Properties website is for general informational
                purposes only. While we strive to keep the information up to date and correct, we make no
                representations or warranties of any kind, express or implied, about the completeness, accuracy,
                reliability, suitability, or availability with respect to the website or the information, products,
                services, or related graphics contained on the website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Property Information</h2>
              <p>
                All property listings, descriptions, prices, and availability information are subject to change without
                notice. While we make every effort to ensure accuracy, we do not guarantee that all information is
                current or error-free. Property details should be verified directly with our agents before making any
                decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Investment Advice</h2>
              <p>
                The information provided on this website should not be construed as investment advice. Real estate
                investments carry risks, and past performance does not guarantee future results. We recommend consulting
                with qualified financial and legal advisors before making any investment decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Valuation Services</h2>
              <p>
                Property valuations provided by Joshina International Properties are estimates based on market analysis
                and professional judgment. These valuations are not guarantees of actual market value and should not be
                relied upon as the sole basis for financial decisions. Professional appraisals may be required for
                mortgage or legal purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Third-Party Links</h2>
              <p>
                This website may contain links to third-party websites. We are not responsible for the content,
                accuracy, or practices of these external sites. Your use of third-party websites is at your own risk and
                subject to their terms and conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              <p>
                In no event shall Joshina International Properties, its directors, employees, or agents be liable for
                any indirect, incidental, special, consequential, or punitive damages resulting from your use of or
                inability to use the website or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p>
                If you have questions about this disclaimer, please contact us at:
                <br />
                Email: info@joshina.com
                <br />
                Phone: +254 700 000 000
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
