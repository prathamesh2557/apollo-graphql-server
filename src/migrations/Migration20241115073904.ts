import { Migration } from '@mikro-orm/migrations';

export class Migration20241115073904 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "image" ("id" serial primary key, "imagename" text not null, "image_url" text null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);
    this.addSql(`alter table "image" add constraint "image_imagename_unique" unique ("imagename");`);

    this.addSql(`create table "post" ("id" serial primary key, "title" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);

    this.addSql(`create table "user" ("id" serial primary key, "username" text not null, "password" text not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);
    this.addSql(`alter table "user" add constraint "user_username_unique" unique ("username");`);

    this.addSql(`create table "image_like" ("id" serial primary key, "image_id" int not null, "user_id" int not null);`);

    this.addSql(`alter table "image_like" add constraint "image_like_image_id_foreign" foreign key ("image_id") references "image" ("id") on update cascade;`);
    this.addSql(`alter table "image_like" add constraint "image_like_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "image_like" drop constraint "image_like_image_id_foreign";`);

    this.addSql(`alter table "image_like" drop constraint "image_like_user_id_foreign";`);

    this.addSql(`drop table if exists "image" cascade;`);

    this.addSql(`drop table if exists "post" cascade;`);

    this.addSql(`drop table if exists "user" cascade;`);

    this.addSql(`drop table if exists "image_like" cascade;`);
  }

}
