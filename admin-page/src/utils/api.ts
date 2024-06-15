import { toast } from '@/components/ui/use-toast';
import { USER } from '@/pages/SignUp';
import axios from 'axios';
import { setSessionUser } from './setSessionUser';
import { MenuItem } from '@/pages/Menu';

const BASE_API_URL = import.meta.env.VITE_API_URL; // Base API URL from environment variables
// Function to sign up a new user
export const signUp = async (user: USER) => {
  try {
    // Check if the API URL is defined
    if (!BASE_API_URL) throw new Error('The API-URL is undefined');
    if (
      user.name &&
      user.email &&
      user.password &&
      user.password_confirm &&
      user.role &&
      !user.image
    ) {
      // Prepare form data based on user input
      const form = new FormData();
      form.append('name', user.name);
      form.append('email', user.email);
      form.append('password', user.password);
      form.append('password_confirm', user.password_confirm);
      form.append('role', user.role);
      // Send POST request to sign up the user
      await axios.post(BASE_API_URL + '/api/signUp', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else if (
      user.name &&
      user.email &&
      user.password &&
      user.password_confirm &&
      user.role &&
      user.image
    ) {
      const form = new FormData();
      form.append('name', user.name);
      form.append('email', user.email);
      form.append('password', user.password);
      form.append('password_confirm', user.password_confirm);
      form.append('role', user.role);
      form.append('image', user.image);
      await axios.post(BASE_API_URL + '/api/signUp', form, {
        headers: {
          'Content-Type': 'multipart/form-data',

          'Access-Control-Allow-Origin': BASE_API_URL,
          'Access-Control-Allow-Headers': 'origin, content-type, accept',
          'Access-Control-Allow-Credentials': 'true',
        },
      });
    }
  } catch (e) {
    // Handle errors and show toast notifications
    toast({
      variant: 'destructive',
      title: 'Sign Up',
      description: 'Failed to create new user',
    });
  }
  throw new Error('Failed to create new user');
};
// Function to log in a user
export const login = async (request: Request) => {
  try {
    if (!request) throw new Error('No form data provided');
    const data = await request.formData();
    const submission = {
      email: data.get('email'),
      password: data.get('password'),
    };

    const res = await axios.post(BASE_API_URL + '/api/login', submission, {
      withCredentials: true,
      // headers: {
      //   'Access-Control-Allow-Origin': BASE_API_URL,
      //   'Access-Control-Allow-Headers': 'origin, content-type, accept',
      //   'Access-Control-Allow-Credentials': 'true',
      // },
    });

    setSessionUser(res.data.data);

    return {
      status: 'success',
    };
  } catch (e) {
    // Handle errors and show toast notifications
    toast({
      variant: 'destructive',
      title: 'Login Error',
      description: 'Failed to login. Check your credential and try again',
    });

    return {
      status: 'fail',
    };
  }
};
// Function to log out a user
export const logout = async () => {
  try {
    await axios.get(BASE_API_URL + '/api/logout', {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': BASE_API_URL,
        'Access-Control-Allow-Headers': 'origin, content-type, accept',
        'Access-Control-Allow-Credentials': 'true',
      },
    });
  } catch (e) {
    // Handle errors and show toast notifications
    toast({
      variant: 'destructive',
      title: 'Logout Error',
      description:
        'Failed to logout. Please try again or close the current tab.',
    });
    throw new Error('Failed to logout');
  }
};
// Function to fetch menu items
export const fetchMenu = async () => {
  try {
    const req = await axios.get(BASE_API_URL + '/api/menu/', {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': BASE_API_URL,
        'Access-Control-Allow-Headers': 'origin, content-type, accept',
        'Access-Control-Allow-Credentials': 'true',
      },
    });

    return req.data.data;
  } catch (e) {
    // Handle errors and show toast notifications
    toast({
      variant: 'destructive',
      title: 'Menu error',
      description:
        'Failed to fetch the menu. Please try again or contact support.',
    });
    throw new Error('Failed to fetch the menu');
  }
};
// Function to fetch offers
export const fetchOffers = async () => {
  try {
    const req = await axios.get(BASE_API_URL + '/api/offers/', {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': BASE_API_URL,
        'Access-Control-Allow-Headers': 'origin, content-type, accept',
        'Access-Control-Allow-Credentials': 'true',
      },
    });

    return req.data.data;
  } catch (e) {
    // Handle errors and show toast notifications
    toast({
      variant: 'destructive',
      title: 'Menu error',
      description:
        'Failed to fetch the menu. Please try again or contact support.',
    });
    throw new Error('Failed to fetch the menu');
  }
};

type MenuItemSubmission = {
  title: FormDataEntryValue | null;
  desc: FormDataEntryValue | null;
  price: FormDataEntryValue | null;
  image?: FormDataEntryValue | null;
  id?: FormDataEntryValue | null;
};
// Function to create a new menu item
export const createMenuItem = async (request: Request) => {
  try {
    if (!request) throw new Error('No form data provided');
    const data = await request.formData();
    const submission: MenuItemSubmission = {
      title: data.get('title'),
      desc: data.get('description'),
      price: data.get('price'),
      image: data.get('image'),
    };

    await axios.post(BASE_API_URL + '/api/menu/', submission, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': BASE_API_URL,
        'Access-Control-Allow-Headers': 'origin, content-type, accept',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'multipart/form-data',
      },
    });

    toast({
      variant: 'default',
      title: 'Success',
      description: 'New item successfully created',
    });

    return {
      status: 'success',
    };
  } catch (e) {
    // Handle errors and show toast notifications
    toast({
      variant: 'destructive',
      title: 'Create Error',
      description: 'Failed to create item. Check your credential and try again',
    });

    return {
      status: 'fail',
    };
  }
};
// Function to delete a menu item
export const deleteMenuItem = async (id: string) => {
  try {
    if (!id) throw new Error('No id provided');

    await axios.delete(BASE_API_URL + `/api/menu/${id}`, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': BASE_API_URL,
        'Access-Control-Allow-Headers': 'origin, content-type, accept',
        'Access-Control-Allow-Credentials': 'true',
        // 'Content-Type': 'multipart/form-data',
      },
    });

    toast({
      variant: 'default',
      title: 'Success',
      description: 'Item successfully deleted',
    });

    return {
      status: 'success',
    };
  } catch (e) {
    // Handle errors and show toast notifications
    toast({
      variant: 'destructive',
      title: 'Delete Error',
      description: 'Failed to delete. Please try again or contact support.',
    });

    return {
      status: 'fail',
    };
  }
};

export type OfferSubmission = {
  title: string;
  promotional_items: MenuItem[];
  price: number | string;
  _id?: string;
  active?: boolean;
};
// Function to create a new offer
export const createOffer = async (offer: OfferSubmission) => {
  try {
    if (!offer) throw new Error('No offer provided');

    await axios.post(BASE_API_URL + '/api/offers/', offer, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': BASE_API_URL,
        'Access-Control-Allow-Headers': 'origin, content-type, accept',
        'Access-Control-Allow-Credentials': 'true',
        // 'Content-Type': 'multipart/form-data',
      },
    });

    toast({
      variant: 'default',
      title: 'Success',
      description: 'New offer successfully created',
    });

    return {
      status: 'success',
    };
  } catch (e) {
    // Handle errors and show toast notifications
    toast({
      variant: 'destructive',
      title: 'Login Error',
      description: 'Failed to login. Check your credential and try again',
    });

    return {
      status: 'fail',
    };
  }
};
// Function to update a menu item
export const patchMenuItem = async (request: Request) => {
  try {
    if (!request) throw new Error('No offer provided');

    const data = await request.formData();

    const submission: MenuItemSubmission = {
      title: data.get('title'),
      desc: data.get('description'),
      price: data.get('price'),
      image: data.get('image'),
      id: data.get('id'),
    };

    await axios.patch(BASE_API_URL + `/api/menu/${submission.id}`, submission, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': BASE_API_URL,
        'Access-Control-Allow-Headers': 'origin, content-type, accept',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'multipart/form-data',
      },
    });

    toast({
      variant: 'default',
      title: 'Success',
      description: 'Item successfully updated',
    });

    return {
      status: 'success',
    };
  } catch (e) {
    // Handle errors and show toast notifications
    toast({
      variant: 'destructive',
      title: 'Update fail',
      description:
        'Failed to update menu item. Please try again or contact support',
    });

    return {
      status: 'fail',
    };
  }
};
// Function to update an offer
export const patchOffer = async (offer: OfferSubmission) => {
  try {
    if (!offer) throw new Error('No offer provided');

    const submission = {
      title: offer.title,
      price: offer.price,
      promotional_items: offer.promotional_items,
      active: offer.active,
    };

    await axios.patch(BASE_API_URL + `/api/offers/${offer._id}`, submission, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': BASE_API_URL,
        'Access-Control-Allow-Headers': 'origin, content-type, accept',
        'Access-Control-Allow-Credentials': 'true',
        // 'Content-Type': 'multipart/form-data',
      },
    });

    toast({
      variant: 'default',
      title: 'Success',
      description: 'Offer successfully updated',
    });

    return {
      status: 'success',
    };
  } catch (e) {
    // Handle errors and show toast notifications
    toast({
      variant: 'destructive',
      title: 'Update fail',
      description:
        'Failed to update offer. Please try again or contact support',
    });

    return {
      status: 'fail',
    };
  }
};
// Function to delete an offer
export const deleteOffer = async (id: string) => {
  try {
    if (!id) throw new Error('No id provided');

    await axios.delete(BASE_API_URL + `/api/offers/${id}`, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': BASE_API_URL,
        'Access-Control-Allow-Headers': 'origin, content-type, accept',
        'Access-Control-Allow-Credentials': 'true',
        // 'Content-Type': 'multipart/form-data',
      },
    });

    toast({
      variant: 'default',
      title: 'Success',
      description: 'Offer successfully deleted',
    });

    return {
      status: 'success',
    };
  } catch (e) {
    // Handle errors and show toast notifications
    toast({
      variant: 'destructive',
      title: 'Delete Error',
      description: 'Failed to delete. Please try again or contact support.',
    });

    return {
      status: 'fail',
    };
  }
};
// Function to update user details
export const updateUser = async (request: React.FormEvent<HTMLFormElement>) => {
  try {
    const submission = new FormData(request.currentTarget);

    const req = await axios.patch(
      BASE_API_URL + `/api/updateUser`,
      submission,
      {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': BASE_API_URL,
          'Access-Control-Allow-Headers': 'origin, content-type, accept',
          'Access-Control-Allow-Credentials': 'true',
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    toast({
      variant: 'default',
      title: 'Success',
      description: 'User successfully updated',
    });

    return {
      status: 'success',
      data: req.data.data,
    };
  } catch (e) {
    // Handle errors and show toast notifications
    toast({
      variant: 'destructive',
      title: 'Update Error',
      description: 'Failed to update. Please try again or contact support.',
    });

    return {
      status: 'fail',
    };
  }
};
// Function to get a reset token
export const get_reset_token = async (
  request: React.FormEvent<HTMLFormElement>
) => {
  try {
    const submission = new FormData(request.currentTarget);

    const req = await axios.post(
      BASE_API_URL + `/api/getToken`,
      Object.fromEntries(submission),
      {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': BASE_API_URL,
          'Access-Control-Allow-Headers': 'origin, content-type, accept',
          // 'Access-Control-Allow-Credentials': 'true',
          // 'Content-Type': 'multipart/form-data',
        },
      }
    );

    return {
      status: 'success',
      email: req.data.data,
    };
  } catch (e) {
    // Handle errors and show toast notifications
    toast({
      variant: 'destructive',
      title: 'Reset Error',
      description:
        'Failed to fetch token. Please try again or contact support.',
    });

    return {
      status: 'fail',
    };
  }
};
// Function to reset the password
export const reset_password_post = async (
  request: React.FormEvent<HTMLFormElement>
) => {
  try {
    const submission = new FormData(request.currentTarget);

    await axios.post(
      BASE_API_URL + `/api/resetPassword`,
      Object.fromEntries(submission),
      {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': BASE_API_URL,
          'Access-Control-Allow-Headers': 'origin, content-type, accept',
          'Access-Control-Allow-Credentials': 'true',
          // 'Content-Type': 'multipart/form-data',
        },
      }
    );
    toast({
      variant: 'default',
      title: 'Success',
      description: 'Password successfully updated',
    });

    return {
      status: 'success',
    };
  } catch (e) {
    // Handle errors and show toast notifications
    toast({
      variant: 'destructive',
      title: 'Reset Error',
      description:
        'Failed to reset password. Please try again or contact support.',
    });

    return {
      status: 'fail',
    };
  }
};
