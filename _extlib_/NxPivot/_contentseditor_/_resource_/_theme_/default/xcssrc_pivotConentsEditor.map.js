(function()
{
	return function()
	{
		nexacro._setCSSMaps(
		{
			"Grid" :
			{
				"self" :
				{
					"enabled" :
					{
						"border" : nexacro.BorderObject("1px solid #b7b1b2")
					}
				},
				"class" :
				{
					"grd_nxPv_treeGrid" :
					{
						"self" :
						{
							"enabled" :
							{
								"font" : nexacro.FontObject("12px/normal \"Segoe UI\"")
							}
						}
					}
				}
			},
			"cell" :
			{
				"parent" :
				{
					"row" :
					{
						"parent" :
						{
							"head" :
							{
								"parent" :
								{
									"Grid" :
									{
										"self" :
										{
											"enabled" :
											{
												"font" : nexacro.FontObject("bold 12px Gulim"),
												"color" : nexacro.ColorObject("#2f2f2f"),
												"border" : nexacro.BorderObject("1px solid #cacaca"),
												"padding" : nexacro.PaddingObject("0px")
											},
											"disabled" :
											{
												"color" : nexacro.ColorObject("#999999")
											}
										},
										"class" :
										{
											"grid_nxPv_editor" :
											{
												"self" :
												{
													"enabled" :
													{
														"color" : nexacro.ColorObject("#000000"),
														"border" : nexacro.BorderObject("1px solid #a3a4a8,1px solid #a3a4a8,1px solid #c2c2c2"),
														"font" : nexacro.FontObject("12px/normal \"Segoe UI\"")
													}
												}
											},
											"grd_nxPv_treeGrid" :
											{
												"self" :
												{
													"enabled" :
													{
														"border" : nexacro.BorderObject("1px solid #a3a4a8"),
														"font" : nexacro.FontObject("12px/normal \"Segoe UI\"")
													}
												}
											}
										}
									}
								}
							},
							"body" :
							{
								"parent" :
								{
									"Grid" :
									{
										"self" :
										{
											"enabled" :
											{
												"color" : nexacro.ColorObject("#222222"),
												"border" : nexacro.BorderObject("1px solid #dbdee2"),
												"padding" : nexacro.PaddingObject("0px")
											},
											"disabled" :
											{
												"color" : nexacro.ColorObject("#999999")
											},
											"blinked" :
											{
												"color" : nexacro.ColorObject("#ffffff")
											}
										},
										"class" :
										{
											"grid_nxPv_editor" :
											{
												"self" :
												{
													"selected" :
													{
														"color" : nexacro.ColorObject("#222222")
													},
													"enabled" :
													{
														"font" : nexacro.FontObject("12px/normal \"Gulim\""),
														"padding" : nexacro.PaddingObject("0px 2px"),
														"color" : nexacro.ColorObject("#333333"),
														"border" : nexacro.BorderObject("1px solid #cccccc")
													}
												}
											},
											"grd_nxPv_treeGrid" :
											{
												"self" :
												{
													"enabled" :
													{
														"font" : nexacro.FontObject("12px/normal \"Segoe UI\""),
														"color" : nexacro.ColorObject("#222222")
													}
												}
											}
										}
									}
								}
							},
							"summary" :
							{
								"parent" :
								{
									"Grid" :
									{
										"self" :
										{
											"enabled" :
											{
												"font" : nexacro.FontObject("bold 12px Gulim"),
												"color" : nexacro.ColorObject("#222222"),
												"border" : nexacro.BorderObject("1px solid #c8c1c2")
											}
										}
									}
								}
							}
						}
					}
				},
				"class" :
				{
					"cell_item_status_filter" :
					{
						"parent" :
						{
							"row" :
							{
								"parent" :
								{
									"body" :
									{
										"parent" :
										{
											"Grid" :
											{
												"self" :
												{
													"enabled" :
													{
														"font" : nexacro.FontObject("normal bold 12px/normal \"Arial\""),
														"color" : nexacro.ColorObject("#ffffff")
													},
													"disabled" :
													{
														"font" : nexacro.FontObject("normal bold 12px/normal \"Arial\""),
														"color" : nexacro.ColorObject("#ffffff")
													},
													"mouseover" :
													{
														"font" : nexacro.FontObject("normal bold 12px/normal \"Arial\""),
														"color" : nexacro.ColorObject("#ffffff")
													},
													"selected" :
													{
														"font" : nexacro.FontObject("normal bold 12px/normal \"Arial\""),
														"color" : nexacro.ColorObject("#ffffff")
													}
												}
											}
										}
									}
								}
							}
						}
					},
					"cell_item_status_SUM" :
					{
						"parent" :
						{
							"row" :
							{
								"parent" :
								{
									"body" :
									{
										"parent" :
										{
											"Grid" :
											{
												"self" :
												{
													"enabled" :
													{
														"font" : nexacro.FontObject("normal bold 12px/normal \"Arial\""),
														"color" : nexacro.ColorObject("#ffffff")
													},
													"disabled" :
													{
														"font" : nexacro.FontObject("normal bold 12px/normal \"Arial\""),
														"color" : nexacro.ColorObject("#ffffff")
													},
													"mouseover" :
													{
														"font" : nexacro.FontObject("normal bold 12px/normal \"Arial\""),
														"color" : nexacro.ColorObject("#ffffff")
													},
													"selected" :
													{
														"font" : nexacro.FontObject("normal bold 12px/normal \"Arial\""),
														"color" : nexacro.ColorObject("#ffffff")
													}
												}
											}
										}
									}
								}
							}
						}
					},
					"cell_item_status_CNT" :
					{
						"parent" :
						{
							"row" :
							{
								"parent" :
								{
									"body" :
									{
										"parent" :
										{
											"Grid" :
											{
												"self" :
												{
													"enabled" :
													{
														"font" : nexacro.FontObject("normal bold 12px/normal \"Arial\""),
														"color" : nexacro.ColorObject("#ffffff")
													},
													"disabled" :
													{
														"font" : nexacro.FontObject("normal bold 12px/normal \"Arial\""),
														"color" : nexacro.ColorObject("#ffffff")
													},
													"mouseover" :
													{
														"font" : nexacro.FontObject("normal bold 12px/normal \"Arial\""),
														"color" : nexacro.ColorObject("#ffffff")
													},
													"selected" :
													{
														"font" : nexacro.FontObject("normal bold 12px/normal \"Arial\""),
														"color" : nexacro.ColorObject("#ffffff")
													}
												}
											}
										}
									}
								}
							}
						}
					},
					"cell_item_status_AVG" :
					{
						"parent" :
						{
							"row" :
							{
								"parent" :
								{
									"body" :
									{
										"parent" :
										{
											"Grid" :
											{
												"self" :
												{
													"enabled" :
													{
														"font" : nexacro.FontObject("normal bold 12px/normal \"Arial\""),
														"color" : nexacro.ColorObject("#ffffff")
													},
													"disabled" :
													{
														"font" : nexacro.FontObject("normal bold 12px/normal \"Arial\""),
														"color" : nexacro.ColorObject("#ffffff")
													},
													"mouseover" :
													{
														"font" : nexacro.FontObject("normal bold 12px/normal \"Arial\""),
														"color" : nexacro.ColorObject("#ffffff")
													},
													"selected" :
													{
														"font" : nexacro.FontObject("normal bold 12px/normal \"Arial\""),
														"color" : nexacro.ColorObject("#ffffff")
													}
												}
											}
										}
									}
								}
							}
						}
					},
					"cell_item_status_MAX" :
					{
						"parent" :
						{
							"row" :
							{
								"parent" :
								{
									"body" :
									{
										"parent" :
										{
											"Grid" :
											{
												"self" :
												{
													"enabled" :
													{
														"font" : nexacro.FontObject("normal bold 12px/normal \"Arial\""),
														"color" : nexacro.ColorObject("#ffffff")
													},
													"disabled" :
													{
														"font" : nexacro.FontObject("normal bold 12px/normal \"Arial\""),
														"color" : nexacro.ColorObject("#ffffff")
													},
													"mouseover" :
													{
														"font" : nexacro.FontObject("normal bold 12px/normal \"Arial\""),
														"color" : nexacro.ColorObject("#ffffff")
													},
													"selected" :
													{
														"font" : nexacro.FontObject("normal bold 12px/normal \"Arial\""),
														"color" : nexacro.ColorObject("#ffffff")
													}
												}
											}
										}
									}
								}
							}
						}
					},
					"cell_item_status_MIN" :
					{
						"parent" :
						{
							"row" :
							{
								"parent" :
								{
									"body" :
									{
										"parent" :
										{
											"Grid" :
											{
												"self" :
												{
													"enabled" :
													{
														"font" : nexacro.FontObject("normal bold 12px/normal \"Arial\""),
														"color" : nexacro.ColorObject("#ffffff")
													},
													"disabled" :
													{
														"font" : nexacro.FontObject("normal bold 12px/normal \"Arial\""),
														"color" : nexacro.ColorObject("#ffffff")
													},
													"mouseover" :
													{
														"font" : nexacro.FontObject("normal bold 12px/normal \"Arial\""),
														"color" : nexacro.ColorObject("#ffffff")
													},
													"selected" :
													{
														"font" : nexacro.FontObject("normal bold 12px/normal \"Arial\""),
														"color" : nexacro.ColorObject("#ffffff")
													}
												}
											}
										}
									}
								}
							}
						}
					},
					"cell_item_status_FUNC" :
					{
						"parent" :
						{
							"row" :
							{
								"parent" :
								{
									"body" :
									{
										"parent" :
										{
											"Grid" :
											{
												"self" :
												{
													"enabled" :
													{
														"font" : nexacro.FontObject("normal bold 12px/normal \"Arial\""),
														"color" : nexacro.ColorObject("#ffffff")
													},
													"disabled" :
													{
														"font" : nexacro.FontObject("normal bold 12px/normal \"Arial\""),
														"color" : nexacro.ColorObject("#ffffff")
													},
													"mouseover" :
													{
														"font" : nexacro.FontObject("normal bold 12px/normal \"Arial\""),
														"color" : nexacro.ColorObject("#ffffff")
													},
													"selected" :
													{
														"font" : nexacro.FontObject("normal bold 12px/normal \"Arial\""),
														"color" : nexacro.ColorObject("#ffffff")
													}
												}
											}
										}
									}
								}
							}
						}
					},
					"treeLv0" :
					{
						"parent" :
						{
							"row" :
							{
								"parent" :
								{
									"body" :
									{
										"parent" :
										{
											"Grid" :
											{
												"class" :
												{
													"grd_nxPv_treeGrid" :
													{
														"self" :
														{
															"enabled" :
															{
																"border" : nexacro.BorderObject("0px none,0px none,1px solid #dbdee2"),
																"color" : nexacro.ColorObject("#222222"),
																"padding" : nexacro.PaddingObject("0px")
															},
															"focused" :
															{
																"border" : nexacro.BorderObject("0px none,0px none,1px solid #dbdee2"),
																"color" : nexacro.ColorObject("#222222"),
																"padding" : nexacro.PaddingObject("0px")
															},
															"mouseover" :
															{
																"border" : nexacro.BorderObject("0px none,0px none,1px solid #dbdee2"),
																"color" : nexacro.ColorObject("#222222"),
																"padding" : nexacro.PaddingObject("0px")
															},
															"selected" :
															{
																"border" : nexacro.BorderObject("0px none,0px none,1px solid #dbdee2"),
																"color" : nexacro.ColorObject("#222222"),
																"padding" : nexacro.PaddingObject("0px")
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					},
					"treeLv1" :
					{
						"parent" :
						{
							"row" :
							{
								"parent" :
								{
									"body" :
									{
										"parent" :
										{
											"Grid" :
											{
												"class" :
												{
													"grd_nxPv_treeGrid" :
													{
														"self" :
														{
															"enabled" :
															{
																"border" : nexacro.BorderObject("1px solid #dbdee2"),
																"color" : nexacro.ColorObject("#222222"),
																"padding" : nexacro.PaddingObject("0px 4px")
															},
															"focused" :
															{
																"border" : nexacro.BorderObject("1px solid #dbdee2"),
																"color" : nexacro.ColorObject("#222222"),
																"padding" : nexacro.PaddingObject("0px 4px")
															},
															"mouseover" :
															{
																"border" : nexacro.BorderObject("1px solid #dbdee2"),
																"color" : nexacro.ColorObject("#222222"),
																"padding" : nexacro.PaddingObject("0px 4px")
															},
															"selected" :
															{
																"border" : nexacro.BorderObject("1px solid #dbdee2"),
																"color" : nexacro.ColorObject("#222222"),
																"padding" : nexacro.PaddingObject("0px 4px")
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			},
			"summary" :
			{
				"parent" :
				{
					"Grid" :
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("1px solid #c8c1c2, 0px none, 0px none, 0px none")
							}
						}
					}
				}
			},
			"hscrollbar" :
			{
				"parent" :
				{
					"Grid" :
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("1px solid #b1b1b1, 0px none, 0px none, 0px none")
							}
						}
					}
				}
			},
			"vscrollbar" :
			{
				"parent" :
				{
					"Grid" :
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("0px none, 0px none, 0px none, 1px solid #b1b1b1")
							}
						}
					}
				}
			},
			"cellbutton" :
			{
				"parent" :
				{
					"GridCellControl" :
					{
						"self" :
						{
							"enabled" :
							{
								"font" : nexacro.FontObject("12px Gulim"),
								"color" : nexacro.ColorObject("#555555"),
								"border" : nexacro.BorderObject("1px solid #c2c2c2")
							},
							"mouseover" :
							{
								"border" : nexacro.BorderObject("1px solid #a0a0a0")
							},
							"focused" :
							{
								"border" : nexacro.BorderObject("1px solid #a0a0a0")
							},
							"disabled" :
							{
								"color" : nexacro.ColorObject("#bbbbbb"),
								"border" : nexacro.BorderObject("1px solid #d9d9d9")
							}
						}
					},
					"cell" :
					{
						"class" :
						{
							"rowDel" :
							{
								"parent" :
								{
									"row" :
									{
										"parent" :
										{
											"body" :
											{
												"parent" :
												{
													"Grid" :
													{
														"class" :
														{
															"grid_nxPv_editor" :
															{
																"self" :
																{
																	"enabled" :
																	{
																		"border" : nexacro.BorderObject("0px none")
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			},
			"cellcalendar" :
			{
				"parent" :
				{
					"GridCellControl" :
					{
						"self" :
						{
							"enabled" :
							{
								"font" : nexacro.FontObject("12px Gulim")
							}
						}
					}
				}
			},
			"cellcheckbox" :
			{
				"parent" :
				{
					"GridCellControl" :
					{
						"self" :
						{
							"enabled" :
							{
								"font" : nexacro.FontObject("12px Gulim")
							}
						}
					}
				}
			},
			"cellcombo" :
			{
				"parent" :
				{
					"GridCellControl" :
					{
						"self" :
						{
							"enabled" :
							{
								"font" : nexacro.FontObject("12px Gulim")
							}
						}
					},
					"cell" :
					{
						"parent" :
						{
							"row" :
							{
								"parent" :
								{
									"body" :
									{
										"parent" :
										{
											"Grid" :
											{
												"class" :
												{
													"grid_nxPv_editor" :
													{
														"self" :
														{
															"enabled" :
															{
																"border" : nexacro.BorderObject("0px none"),
																"padding" : nexacro.PaddingObject("0px 2px"),
																"font" : nexacro.FontObject("12px/normal \"Gulim\""),
																"color" : nexacro.ColorObject("#222222")
															}
														}
													},
													"grd_nxPv_treeGrid" :
													{
														"self" :
														{
															"enabled" :
															{
																"border" : nexacro.BorderObject("0px none"),
																"font" : nexacro.FontObject("12px/normal \"Segoe UI\""),
																"color" : nexacro.ColorObject("#222222")
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			},
			"combolist" :
			{
				"parent" :
				{
					"cellcombo" :
					{
						"parent" :
						{
							"GridCellControl" :
							{
								"self" :
								{
									"enabled" :
									{
										"font" : nexacro.FontObject("12px Gulim"),
										"color" : nexacro.ColorObject("#333333")
									}
								}
							}
						}
					}
				}
			},
			"celledit" :
			{
				"parent" :
				{
					"GridCellControl" :
					{
						"self" :
						{
							"enabled" :
							{
								"font" : nexacro.FontObject("12px Gulim"),
								"border" : nexacro.BorderObject("1px solid #d5d5d5"),
								"padding" : nexacro.PaddingObject("1px 0px 0px 0px")
							},
							"mouseover" :
							{
								"border" : nexacro.BorderObject("1px solid #5a86cd")
							},
							"focused" :
							{
								"border" : nexacro.BorderObject("1px solid #5a86cd")
							},
							"disabled" :
							{
								"color" : nexacro.ColorObject("#999999")
							}
						}
					},
					"cell" :
					{
						"parent" :
						{
							"row" :
							{
								"parent" :
								{
									"body" :
									{
										"parent" :
										{
											"Grid" :
											{
												"class" :
												{
													"grid_nxPv_editor" :
													{
														"self" :
														{
															"enabled" :
															{
																"border" : nexacro.BorderObject("0px none"),
																"padding" : nexacro.PaddingObject("0px 2px"),
																"font" : nexacro.FontObject("12px/normal \"Gulim\""),
																"color" : nexacro.ColorObject("#222222")
															}
														}
													},
													"grd_nxPv_treeGrid" :
													{
														"self" :
														{
															"enabled" :
															{
																"border" : nexacro.BorderObject("0px none"),
																"font" : nexacro.FontObject("12px/normal \"Segoe UI\""),
																"color" : nexacro.ColorObject("#222222")
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			},
			"cellexpandbutton" :
			{
				"parent" :
				{
					"GridCellControl" :
					{
						"self" :
						{
							"enabled" :
							{
								"icon" : nexacro.UrlObject("URL('imagerc::btn_pvEditor_customFn.png')"),
								"padding" : nexacro.PaddingObject("0px 1px"),
								"border" : nexacro.BorderObject("1px solid #f0f0f0")
							},
							"focused" :
							{
								"icon" : nexacro.UrlObject("URL('imagerc::btn_pvEditor_customFn.png')"),
								"padding" : nexacro.PaddingObject("0px 1px"),
								"border" : nexacro.BorderObject("1px solid #f0f0f0")
							},
							"pushed" :
							{
								"icon" : nexacro.UrlObject("URL('imagerc::btn_pvEditor_customFn.png')"),
								"padding" : nexacro.PaddingObject("0px 1px"),
								"border" : nexacro.BorderObject("1px solid #f0f0f0")
							},
							"selected" :
							{
								"icon" : nexacro.UrlObject("URL('imagerc::btn_pvEditor_customFn.png')"),
								"padding" : nexacro.PaddingObject("0px 1px"),
								"border" : nexacro.BorderObject("1px solid #f0f0f0")
							},
							"mouseover" :
							{
								"border" : nexacro.BorderObject("1px solid #4093e7"),
								"padding" : nexacro.PaddingObject("0px 1px")
							}
						}
					}
				}
			},
			"cellmaskedit" :
			{
				"parent" :
				{
					"GridCellControl" :
					{
						"self" :
						{
							"enabled" :
							{
								"font" : nexacro.FontObject("12px Gulim"),
								"border" : nexacro.BorderObject("1px solid #d5d5d5"),
								"padding" : nexacro.PaddingObject("1px 2px 0px 2px")
							},
							"mouseover" :
							{
								"border" : nexacro.BorderObject("1px solid #5a86cd")
							},
							"focused" :
							{
								"border" : nexacro.BorderObject("1px solid #5a86cd")
							},
							"disabled" :
							{
								"color" : nexacro.ColorObject("#999999")
							}
						}
					}
				}
			},
			"cellprogressbar" :
			{
				"parent" :
				{
					"GridCellControl" :
					{
						"self" :
						{
							"enabled" :
							{
								"font" : nexacro.FontObject("12px Gulim")
							}
						}
					}
				}
			},
			"celltextarea" :
			{
				"parent" :
				{
					"GridCellControl" :
					{
						"self" :
						{
							"enabled" :
							{
								"font" : nexacro.FontObject("12px Gulim")
							}
						}
					}
				}
			},
			"treeitemtext" :
			{
				"parent" :
				{
					"celltreeitem" :
					{
						"parent" :
						{
							"GridCellControl" :
							{
								"self" :
								{
									"enabled" :
									{
										"font" : nexacro.FontObject("12px/normal \"Segoe UI\""),
										"color" : nexacro.ColorObject("#222222"),
										"padding" : nexacro.PaddingObject("0px")
									},
									"disabled" :
									{
										"color" : nexacro.ColorObject("#999999")
									}
								}
							}
						}
					}
				}
			},
			"treeitembutton" :
			{
				"parent" :
				{
					"celltreeitem" :
					{
						"parent" :
						{
							"GridCellControl" :
							{
								"self" :
								{
									"expand" :
									{
										"icon" : nexacro.UrlObject("URL(\"imagerc::btn_pvEditor_treeExpand.png\")"),
										"padding" : nexacro.PaddingObject("0px")
									},
									"collapse" :
									{
										"icon" : nexacro.UrlObject("URL(\"imagerc::btn_pvEditor_treeCollapse.png\")"),
										"padding" : nexacro.PaddingObject("0px")
									}
								}
							}
						}
					}
				}
			},
			"treeitemimage" :
			{
				"parent" :
				{
					"celltreeitem" :
					{
						"parent" :
						{
							"GridCellControl" :
							{
								"self" :
								{
									"enabled" :
									{
										"padding" : nexacro.PaddingObject("0px")
									},
									"expand" :
									{
										"padding" : nexacro.PaddingObject("0px")
									},
									"collapse" :
									{
										"padding" : nexacro.PaddingObject("0px")
									}
								}
							}
						}
					}
				}
			},
			"celltreeline" :
			{
				"parent" :
				{
					"GridCellControl" :
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("1px dotted #909090")
							}
						}
					}
				}
			},
			"PopupMenu" :
			{
				"class" :
				{
					"popmenu_nxPv_basic" :
					{
						"self" :
						{
							"enabled" :
							{
								"font" : nexacro.FontObject("12px/normal \"Segoe UI\"")
							}
						}
					}
				}
			},
			"popupmenuitem" :
			{
				"parent" :
				{
					"PopupMenu" :
					{
						"class" :
						{
							"popmenu_nxPv_basic" :
							{
								"self" :
								{
									"enabled" :
									{
										"font" : nexacro.FontObject("12px/normal \"Segoe UI\"")
									}
								}
							}
						}
					}
				}
			},
			"Button" :
			{
				"class" :
				{
					"btn_nxPv_tabBtn" :
					{
						"self" :
						{
							"enabled" :
							{
								"color" : nexacro.ColorObject("#111111"),
								"border" : nexacro.BorderObject("0px none,1px solid #a8a9af"),
								"padding" : nexacro.PaddingObject("0px"),
								"font" : nexacro.FontObject("12px/normal \"Segoe UI\"")
							},
							"focused" :
							{
								"color" : nexacro.ColorObject("#111111"),
								"border" : nexacro.BorderObject("0px none,1px solid #a8a9af"),
								"padding" : nexacro.PaddingObject("0px"),
								"font" : nexacro.FontObject("12px/normal \"Segoe UI\"")
							},
							"mouseover" :
							{
								"color" : nexacro.ColorObject("#111111"),
								"border" : nexacro.BorderObject("0px none,1px solid #a8a9af"),
								"padding" : nexacro.PaddingObject("0px"),
								"font" : nexacro.FontObject("12px/normal \"Segoe UI\"")
							},
							"pushed" :
							{
								"color" : nexacro.ColorObject("#111111"),
								"border" : nexacro.BorderObject("0px none,1px solid #a8a9af"),
								"padding" : nexacro.PaddingObject("0px"),
								"font" : nexacro.FontObject("12px/normal \"Segoe UI\"")
							},
							"selected" :
							{
								"color" : nexacro.ColorObject("#111111"),
								"border" : nexacro.BorderObject("0px none,1px solid #a8a9af"),
								"padding" : nexacro.PaddingObject("0px"),
								"font" : nexacro.FontObject("12px/normal \"Segoe UI\"")
							},
							"disabled" :
							{
								"color" : nexacro.ColorObject("#bbbbbb"),
								"border" : nexacro.BorderObject("0px none,1px solid #a8a9af")
							}
						}
					}
				}
			},
			"PopupDiv" :
			{
				"class" :
				{
					"popdiv_nxPv_basic" :
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("2px solid #b5b5b5")
							}
						}
					}
				}
			},
			"Static" :
			{
				"class" :
				{
					"sta_nxPv_popTitle" :
					{
						"self" :
						{
							"enabled" :
							{
								"font" : nexacro.FontObject("12px/normal \"Segoe UI\"")
							}
						}
					}
				}
			},
			"Edit" :
			{
				"class" :
				{
					"edit_nxPv_popEdit" :
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("1px solid #a3a4a8"),
								"padding" : nexacro.PaddingObject("2px")
							},
							"focused" :
							{
								"border" : nexacro.BorderObject("1px solid #a3a4a8"),
								"padding" : nexacro.PaddingObject("2px")
							},
							"mouseover" :
							{
								"border" : nexacro.BorderObject("1px solid #a3a4a8"),
								"padding" : nexacro.PaddingObject("2px")
							}
						}
					}
				}
			},
			"TextArea" :
			{
				"class" :
				{
					"txtarea_nxPv_popTxtarea" :
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("1px solid #a3a4a8"),
								"padding" : nexacro.PaddingObject("2px")
							},
							"mouseover" :
							{
								"border" : nexacro.BorderObject("1px solid #a3a4a8"),
								"padding" : nexacro.PaddingObject("2px")
							},
							"focused" :
							{
								"border" : nexacro.BorderObject("1px solid #a3a4a8"),
								"padding" : nexacro.PaddingObject("2px")
							}
						}
					}
				}
			},
			"ImageViewer" :
			{
				"class" :
				{
					"NxPivot_comp_splitterV" :
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("0px none")
							}
						}
					},
					"NxPivot_comp_splitterH" :
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("0px none")
							}
						}
					}
				}
			},
			"Div" :
			{
				"class" :
				{
					"div_nxPv_conBorder" :
					{
						"self" :
						{
							"enabled" :
							{
								"border" : nexacro.BorderObject("1px solid #b7b1b2")
							}
						}
					}
				}
			}
		}
		);

		var imgcache = nexacro._getImageCacheMaps();
		
	};
}
)();
