import { TextEncoder, TextDecoder } from 'util';

/* hack for using mongoose in jest */
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;
