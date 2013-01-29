/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 * WARNING: This is generated code. Do not modify. Your changes *will* be lost.
 */

#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"

@implementation ApplicationDefaults

+ (NSMutableDictionary*) copyDefaults
{
	NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];
	
	[_property setObject:[TiUtils stringValue:@"1NZB1JSM1GmbILNIQRl9iPPC5u5DFFTh"] forKey:@"acs-oauth-secret-production"];
	[_property setObject:[TiUtils stringValue:@"50DnNSuGpqVhbqy5ZSTXI1V8zxwuh7G6"] forKey:@"acs-oauth-key-production"];
	[_property setObject:[TiUtils stringValue:@"gebVmID20xnipZRaSNwxpgYESQibvxJ2"] forKey:@"acs-api-key-production"];
	[_property setObject:[TiUtils stringValue:@"rMHO18c8QnXE0XcHJgDZcLxoVRsL61nQ"] forKey:@"acs-oauth-secret-development"];
	[_property setObject:[TiUtils stringValue:@"3fGD8ftpbLt9gbV7Re6KbdDpwQx6k3jj"] forKey:@"acs-oauth-key-development"];
	[_property setObject:[TiUtils stringValue:@"zYuJAvgX5vp1pgwd4GAQhZZUxLdrcWu0"] forKey:@"acs-api-key-development"];
	[_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];
	return _property;
}

@end