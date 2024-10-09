import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js/pure';
import { stripePublishableKey } from 'data/constants';

/**
 * Hook that loads the Stripe script and initializes the Stripe class.
 * Returns an object containing the Stripe instance, a loading state, and any error that occurred.
 * accountId: The Stripe account ID to use for the Stripe instance.
 *            aka: company.stripe_connect_user_id
 */
export function useStripeWithAccount(accountId) {
  const [isStripeLoading, setStripeLoading] = useState(false);
  const [stripeInstance, setStripeInstance] = useState(null);
  const [stripeError, setStripeError] = useState(null);

  useEffect(() => {
    const loadAndInitializeStripe = async () => {
      setStripeLoading(true);

      try {
        console.log('Loading Stripe with account ID:', accountId);
        // If the accountId is present, we are using a connected account
        // and need to pass the accountId to the Stripe instance.
        // This is used to determine which account to charge.
        const stripeOptions = accountId ? { stripeAccount: accountId } : {};

        const stripe = await loadStripe(
          stripePublishableKey,
          stripeOptions
        );

        setStripeInstance(stripe);
      } catch (error) {
        setStripeError(
          new Error(
            'The payment library (Stripe) did not load correctly',
            error
          )
        );
      } finally {
        setStripeLoading(false);
      }
    };

    loadAndInitializeStripe();
  }, [accountId]);

  return {
    isStripeLoading,
    stripeInstance,
    stripeError,
  };
}
