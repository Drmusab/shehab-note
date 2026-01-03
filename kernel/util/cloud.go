// SiYuan - Refactor your thinking
// Copyright (c) 2020-present, b3log.org
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

package util

// Cloud sync disabled in Shehab fork
var CurrentCloudRegion = 0

func IsChinaCloud() bool {
	return false // Cloud disabled in Shehab fork
}

func GetCloudServer() string {
	return "" // Cloud sync disabled in Shehab fork
}

func GetCloudWebSocketServer() string {
	return "" // Cloud sync disabled in Shehab fork
}

func GetCloudSyncServer() string {
	return "" // Cloud sync disabled in Shehab fork
}

func GetCloudAssetsServer() string {
	return "" // Cloud sync disabled in Shehab fork
}

func GetCloudAccountServer() string {
	return "" // Cloud sync disabled in Shehab fork
}

func GetCloudForumAssetsServer() string {
	return "" // Cloud sync disabled in Shehab fork
}

const (
	// Cloud server URLs disabled in Shehab fork
	// chinaServer            = "https://siyuan-sync.b3logfile.com"
	// chinaWebSocketServer   = "wss://siyuan-sync.b3logfile.com"
	// chinaSyncServer        = "https://siyuan-data.b3logfile.com/"
	// chinaCloudAssetsServer = "https://assets.b3logfile.com/siyuan/"
	// chinaAccountServer     = "https://ld246.com"
	// chinaForumAssetsServer = "https://b3logfile.com/file/"
	
	// northAmericaServer            = "https://siyuan-cloud.liuyun.io"
	// northAmericaWebSocketServer   = "wss://siyuan-cloud.liuyun.io"
	// northAmericaSyncServer        = "https://siyuan-data.liuyun.io/"
	// northAmericaCloudAssetsServer = "https://assets.liuyun.io/siyuan/"
	// northAmericaAccountServer     = "https://liuyun.io"
	// northAmericaForumAssetsServer = "https://assets.liuyun.io/file/"

	BazaarStatServer = "https://bazaar.b3logfile.com" // 集市包统计服务地址，七牛云，全球 CDN
	BazaarOSSServer  = "https://oss.b3logfile.com"    // 云端对象存储地址，七牛云，仅用于读取集市包，全球 CDN
)
