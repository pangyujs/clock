import {createBrowserHistory} from 'history';

const ENV = process.env.NODE_ENV;
let publicUrl: string = '';

console.log(ENV);


if (ENV === 'development') {
  publicUrl = '/';
} else if (ENV === 'production') {
  publicUrl = '/clock';
}

const history = createBrowserHistory({
  basename: publicUrl
});

export default history;