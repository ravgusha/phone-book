import AddContact from '../containers/AddContact';
import Contacts from '../containers/Contacts';
import Form from '../containers/Contacts/Form';
import EditContact from '../containers/EditContact';

const routes = [
  {
    path: '/',
    component: Contacts,
  },
  {
    path: '/add',
    component: Form,
  },
  {
    path: '/form/:id',
    component: Form,
  },
];

export default routes;
