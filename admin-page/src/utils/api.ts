import { toast } from '@/components/ui/use-toast';
import { USER } from '@/pages/SignUp';
import axios from 'axios';
import { setSessionUser } from './setSessionUser';
import { MenuItem } from '@/pages/Menu';

const BASE_API_URL = import.meta.env.VITE_API_URL;

export const signUp = async (user: USER) => {
  try {
    if (!BASE_API_URL) throw new Error('The API-URL is undefined');
    if (
      user.name &&
      user.email &&
      user.password &&
      user.password_confirm &&
      user.role &&
      !user.image
    ) {
      const form = new FormData();
      form.append('name', user.name);
      form.append('email', user.email);
      form.append('password', user.password);
      form.append('password_confirm', user.password_confirm);
      form.append('role', user.role);

      await axios.post(BASE_API_URL + 'signUp', form, {
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
      await axios.post(BASE_API_URL + 'signUp', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // TODO update url
          'Access-Control-Allow-Origin': 'http://locahost:8000',
          'Access-Control-Allow-Headers': 'origin, content-type, accept',
          'Access-Control-Allow-Credentials': 'true',
        },
      });
    }
  } catch (e) {
    if (typeof e === 'string') {
      toast({
        variant: 'destructive',
        title: 'Sign Up',
        description: e,
      });
    } else if (e instanceof Error) {
      toast({
        variant: 'destructive',
        title: 'Sign Up',
        description: e.message,
      });
    }
    throw new Error('Failed to create new user');
  }
};

export const login = async (request: Request) => {
  try {
    if (!request) throw new Error('No form data provided');
    const data = await request.formData();
    const submission = {
      email: data.get('email'),
      password: data.get('password'),
    };

    const res = await axios.post(BASE_API_URL + 'login', submission, {
      withCredentials: true,
      headers: {
        // TODO update url
        'Access-Control-Allow-Origin': 'http://locahost:8000',
        'Access-Control-Allow-Headers': 'origin, content-type, accept',
        'Access-Control-Allow-Credentials': 'true',
      },
    });

    setSessionUser(res.data.data);

    return {
      status: 'success',
    };
  } catch (e) {
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

export const logout = async () => {
  try {
    await axios.get(BASE_API_URL + 'logout', {
      withCredentials: true,
      headers: {
        // TODO update url
        'Access-Control-Allow-Origin': 'http://locahost:8000/logout',
        'Access-Control-Allow-Headers': 'origin, content-type, accept',
        'Access-Control-Allow-Credentials': 'true',
      },
    });
  } catch (e) {
    toast({
      variant: 'destructive',
      title: 'Logout Error',
      description:
        'Failed to logout. Please try again or close the current tab.',
    });
    throw new Error('Failed to logout');
  }
};

export const fetchMenu = async () => {
  try {
    const req = await axios.get(BASE_API_URL + 'menu/', {
      withCredentials: true,
      headers: {
        // TODO update url
        'Access-Control-Allow-Origin': 'http://locahost:8000/logout',
        'Access-Control-Allow-Headers': 'origin, content-type, accept',
        'Access-Control-Allow-Credentials': 'true',
      },
    });

    return req.data.data;
  } catch (e) {
    toast({
      variant: 'destructive',
      title: 'Menu error',
      description:
        'Failed to fetch the menu. Please try again or contact support.',
    });
    throw new Error('Failed to fetch the menu');
  }
};

export const fetchOffers = async () => {
  try {
    const req = await axios.get(BASE_API_URL + 'offers/', {
      withCredentials: true,
      headers: {
        // TODO update url
        'Access-Control-Allow-Origin': 'http://locahost:8000/logout',
        'Access-Control-Allow-Headers': 'origin, content-type, accept',
        'Access-Control-Allow-Credentials': 'true',
      },
    });

    return req.data.data;
  } catch (e) {
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

    await axios.post(BASE_API_URL + 'menu/', submission, {
      withCredentials: true,
      headers: {
        // TODO update url
        'Access-Control-Allow-Origin': 'http://locahost:8000',
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

export type OfferSubmission = {
  title: string;
  promotional_items: MenuItem[];
  price: number | string;
};

export const createOffer = async (offer: OfferSubmission) => {
  try {
    if (!offer) throw new Error('No offer provided');

    await axios.post(BASE_API_URL + 'offers/', offer, {
      withCredentials: true,
      headers: {
        // TODO update url
        'Access-Control-Allow-Origin': 'http://locahost:8000',
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

export const pathMenuItem = async (request: Request) => {
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

    await axios.patch(BASE_API_URL + `menu/${submission.id}`, submission, {
      withCredentials: true,
      headers: {
        // TODO update url
        'Access-Control-Allow-Origin': 'http://locahost:8000',
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
