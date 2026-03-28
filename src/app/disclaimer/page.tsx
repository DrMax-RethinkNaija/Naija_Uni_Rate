import Link from "next/link";

export const metadata = {
  title: "Disclaimer & Terms - RateMyNaijaLecturer",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-white mb-8">
        Disclaimer & Terms of Use
      </h1>

      <div className="space-y-8 text-gray-300 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-white mb-3">
            1. Purpose of This Platform
          </h2>
          <p>
            RateMyNaijaLecturer is a platform designed to empower Nigerian
            university students by providing a safe, anonymous space to share
            their genuine experiences with lecturers. The goal is to promote
            transparency, accountability, and safety within Nigerian higher
            education institutions.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">
            2. Anonymity
          </h2>
          <p>
            All reviews are submitted anonymously. We do not collect, store, or
            associate any personally identifiable information with reviews. We do
            not track IP addresses or require user registration. Your identity is
            protected.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">
            3. Truthfulness & No False Accusations
          </h2>
          <p>
            By submitting a review, you confirm that your review is based on
            your genuine personal experience. <strong>False accusations are
            strictly prohibited and will not be tolerated.</strong> This platform
            exists to protect students, not to defame individuals. Reviews that
            are determined to be fabricated, malicious, or defamatory may be
            removed without notice.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">
            4. User-Submitted Content
          </h2>
          <p>
            All reviews represent the personal opinions and experiences of
            individual users. RateMyNaijaLecturer does not verify, endorse, or
            guarantee the accuracy of any review. The presence of a review does
            not constitute a statement of fact by this platform.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">
            5. Review Verification Status
          </h2>
          <p>
            Reviews are tagged as either &ldquo;Verified&rdquo; or
            &ldquo;Unverified&rdquo;. &ldquo;Verified&rdquo; indicates that the
            review has been checked by our moderation team for compliance with
            these terms. It does not mean the claims in the review have been
            independently verified as factual.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">
            6. Limitation of Liability
          </h2>
          <p>
            RateMyNaijaLecturer is provided &ldquo;as is&rdquo; without
            warranties of any kind. We are not responsible for any decisions made
            based on information found on this platform. Users should exercise
            their own judgment and seek additional sources of information when
            making educational decisions.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">
            7. Content Removal
          </h2>
          <p>
            We reserve the right to remove any review that violates these terms,
            including but not limited to: false accusations, hate speech,
            personally identifiable information of reviewers, or content that
            does not relate to a genuine educational experience. If you believe a
            review is defamatory or false, please contact us for review.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">
            8. Prohibited Use
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Submitting false or fabricated reviews</li>
            <li>Using the platform to conduct personal vendettas</li>
            <li>Submitting reviews for lecturers you have not interacted with</li>
            <li>Spamming or submitting duplicate reviews</li>
            <li>Attempting to identify anonymous reviewers</li>
            <li>
              Using information from this platform to harass or threaten any
              individual
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">
            9. Reporting Abuse
          </h2>
          <p>
            If you are a student experiencing abuse from a lecturer, we
            encourage you to also report to your university&apos;s student
            affairs office, anti-sexual harassment committee, or relevant
            authorities. This platform is a tool for awareness, not a substitute
            for formal reporting channels.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">
            10. Changes to Terms
          </h2>
          <p>
            We may update these terms at any time. Continued use of the platform
            after changes constitutes acceptance of the updated terms.
          </p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-dark-700 text-center">
        <Link
          href="/review/new"
          className="inline-block bg-naija-green hover:bg-naija-green-dark text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          Submit a Review
        </Link>
      </div>
    </div>
  );
}
