'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const dotenv_1 = __importDefault(require('dotenv'));
// import { connect } from 'mongoose';
// Routes
const user_1 = __importDefault(require('./routes/user'));
const novel_1 = __importDefault(require('./routes/novel'));
// Environment Variables
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const ATLAS_URI = process.env.ATLAS_URI;
const app = (0, express_1.default)();
// Express App Setup
app.use(express_1.default.json());
app.use('/', home_1.default);
app.use(novel_1.default);
// Run the server
app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
