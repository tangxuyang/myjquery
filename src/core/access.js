define( [
	"../core",
	"../core/toType",
	"../var/isFunction"
], function( jQuery, toType, isFunction ) {

"use strict";

// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,// 集合的大小
		bulk = key == null;// 是否批量操作，没有指定key就认为是对全部data进行操作，因此是批量操作

	// Sets many values
	if ( toType( key ) === "object" ) {// key是对象，表示用对象方式来设置，因此是多个值，所有设置操作都是可连缀的
		chainable = true;
		for ( i in key ) {// 遍历key对象，调用access给单个key设置value
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {// value有值，说明是单个设置，所有设置都是可连缀的
		chainable = true;

		if ( !isFunction( value ) ) {// 如果value不是函数
			raw = true;
		}

		if ( bulk ) {// 表示key此时为null，只传入了value

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {// key有值，或value是函数
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {// 批量获取
		return fn.call( elems );
	}

	// 单个获取
	return len ? fn( elems[ 0 ], key ) : emptyGet;
};

return access;

} );
