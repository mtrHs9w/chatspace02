# ChatSpace DB設計

## users table
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|name|string|null: false|
### Association
 - has_many :groups, through: :groups_users
 - has_many :groups_users
 - has_many :messages


## groups table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
 - has_many :users, through: :groups_users
 - has_many :groups_users
 - has_many :messages


## messages table
|Column|Type|Options|
|------|----|-------|
|body|text|
|img|string|
|group_id|integer|null: false|
|user_id|integer|null: false|
### Association
 - belongs_to :user
 - belongs_to :group

## groups_users table
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
### Association
 - belongs_to :group
 - belongs_to :user