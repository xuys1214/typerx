import { GET, Path, PathParam, POST, PUT, DELETE, QueryParam } from 'typescript-rest';
import { Example, Tags } from 'typescript-rest-swagger';
import { Helper, UISchema, PaginateResponse } from 'modex';
import { Db } from './../database';
import { Dict } from './../schemas';

/**
 * 获取菜单y.
 */
@Tags('base')
@Path('/api/dict')
export class DictController {

    /**
      * 获取客户管理界面配置信息.
      */
    @Example<UISchema>({
        entry: {
            name: {
                title: '名字',
                description: '名字描述',
                widget: 'input',
                type: 'string'
            },
            birthday: {
                title: '生日',
                description: '生日描述',
                widget: 'date',
                type: 'string'
            },
        },
        columns: [
            {
                field: 'name',
                header: '名字',
            }
        ]
    })
    @Path('config')
    @GET
    async getConfig(): Promise<UISchema> {
        return Helper.getUISchema('Dict');
    }


    /**
     * * 按分类获取字典数据
     * 
     * @param {string} category 分类键名
     * @returns {Promise<Dict[]>} 
     * @memberof DictController
     */
    @Path('category/:category')
    @GET
    async getDictByCategory( @PathParam('category') category: string): Promise<Dict[]> {
        const docs = await Db.Dict.find({ category: category }).exec();
        if (docs) {
            return docs.map((res: any) => {
                return res.toClient() as Dict;
            });
        } else {
            return null;
        }
    }


    /**
     * * 创建字典表
     * 
     * @param {Dict} entry 
     * @returns {Promise<Dict>} 
     * @memberof DictController
     */
    @POST
    async create(entry: Dict): Promise<Dict> {
        return Helper.create('Dict', entry);
    }


    /**
     * * 更新字典表
     * 
     * @param {Dict} entry 
     * @returns {Promise<Dict>} 
     * @memberof DictController
     */
    @PUT
    async update(entry: Dict): Promise<Dict> {
        return Helper.update('Dict', entry);
    }


    /**
     * 分页查询字典表
     * 
     * @param {number} [page] 第几页  从 1 开始计;
     * @param {number} [size] 页大小
     * @param {string} [sort] 排序
     * @returns {Promise<PaginateResponse<Dict[]>>} 
     * @memberof DictController
     */
    @Path('query')
    @GET
    async getPaged(
        @QueryParam('page') page?: number,
        @QueryParam('size') size?: number,
        @QueryParam('sort') sort?: string): Promise<PaginateResponse<Dict[]>> {
        return Helper.getPagedData<Dict>('Dict', page, size, [], sort);
    }

    /**
     * 删除字典信息
     * 
     * @param {string} id 编号 可以逗号分割传递多个。
     * @returns {Promise<boolean>} 
     * @memberof DictController
     */
    @Path(':id')
    @DELETE
    async remove( @PathParam('id') id: string): Promise<boolean> {
        return Helper.remove('Dict', id);
    }


    /**
     * 查询字典表
     * @param id 编号
     */
    @Path(':id')
    @GET
    async get( @PathParam('id') id: string): Promise<Dict> {
        return Helper.get('Dict', id);
    }

}
