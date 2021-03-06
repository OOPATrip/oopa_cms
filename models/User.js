var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User', {
	autokey: { path: 'slug', from: 'fullName', unique: false },
	searchFields: 'email',
	map: { name: 'email' },
});

User.add({
	name: { 
		type: Types.Name, 
		required: true, 
		index: true,
		initial: true
	},
	email: { 
		type: Types.Email, 
		initial: true, 
		required: true, 
		unique: true, 
		index: true 
	},
	password: { 
		type: Types.Password, 
		initial: true, 
		required: true 
	},
	gender: {
		type: Types.Select,
		require: true,
		options: 'male, female, other',
	},
	lastAccessDate: {
		type: Types.Datetime,
		default: Date.now,
	},
	role: {
		type: Types.Text,
		default: 'user',
		options: 'admin, adminro, user, temp',
	},
	blocked: {
		type: Types.Boolean,
		default: false,
	},
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin';
User.register();
