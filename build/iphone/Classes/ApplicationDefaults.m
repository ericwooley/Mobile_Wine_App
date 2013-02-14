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
	
	[_property setObject:[TiUtils stringValue:@"iTHIbBoo0Agauy1VaOOZ4XgDIWYUopzR"] forKey:@"acs-oauth-secret-production"];
	[_property setObject:[TiUtils stringValue:@"gflksmunLeoLaiPgR0XI3VI0m58P1SKa"] forKey:@"acs-oauth-key-production"];
	[_property setObject:[TiUtils stringValue:@"MPWqQnoSxNIpLmzeKvhPDsSk57Rg9Bhe"] forKey:@"acs-api-key-production"];
	[_property setObject:[TiUtils stringValue:@"axmJ26IskMm0v05zEmyJ7pat5K80hM39"] forKey:@"acs-oauth-secret-development"];
	[_property setObject:[TiUtils stringValue:@"1JxfWLSHFRS4DhaKROwV5zDLRoUvpVFN"] forKey:@"acs-oauth-key-development"];
	[_property setObject:[TiUtils stringValue:@"XWnaxCijaw9Y0oLkKhOJIwUWoyhJiz7M"] forKey:@"acs-api-key-development"];
	[_property setObject:[NSNumber numberWithBool:[TiUtils boolValue:@""]] forKey:@"ti.android.fastdev"];
	[_property setObject:[TiUtils stringValue:@"dip"] forKey:@"ti.ui.defaultunit"];
	return _property;
}

@end